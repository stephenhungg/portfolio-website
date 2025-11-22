import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Brute force protection constants
const MAX_FAILED_ATTEMPTS = 5;
const BASE_LOCKOUT_DURATION = 15 * 60; // 15 minutes in seconds (base lockout)
const MAX_LOCKOUT_DURATION = 24 * 60 * 60; // 24 hours maximum lockout
const ATTEMPT_WINDOW = 60; // Track attempts within 1 minute window
const LOCKOUT_HISTORY_KEY = 'login-lockout-history'; // Track total lockouts per IP

function getClientIP(request: NextRequest): string {
  // Try to get real IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Try CF-Connecting-IP (Cloudflare)
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) {
    return cfIP;
  }
  
  // Fallback: use a hash of headers as identifier (for serverless environments)
  // This is less ideal but better than 'unknown' for rate limiting
  const userAgent = request.headers.get('user-agent') || '';
  const accept = request.headers.get('accept') || '';
  // Create a consistent identifier from headers (not perfect, but works in serverless)
  return `header-${Buffer.from(userAgent + accept).toString('base64').substring(0, 16)}`;
}

async function getLockoutDuration(ip: string): Promise<number> {
  // Get lockout history to implement escalating lockouts
  const historyKey = `${LOCKOUT_HISTORY_KEY}:${ip}`;
  const history = await redis.get(historyKey);
  const lockoutCount = history ? (typeof history === 'string' ? parseInt(history) : history as number) : 0;
  
  // Escalating lockout: 15min, 1hr, 6hr, 24hr
  const durations = [
    BASE_LOCKOUT_DURATION,           // 15 minutes (1st lockout)
    BASE_LOCKOUT_DURATION * 4,      // 1 hour (2nd lockout)
    BASE_LOCKOUT_DURATION * 24,     // 6 hours (3rd lockout)
    MAX_LOCKOUT_DURATION            // 24 hours (4th+ lockout)
  ];
  
  const durationIndex = Math.min(lockoutCount, durations.length - 1);
  return durations[durationIndex];
}

async function checkBruteForceProtection(ip: string): Promise<{ allowed: boolean; remainingAttempts?: number; lockoutUntil?: number }> {
  const attemptKey = `login-attempts:${ip}`;
  const lockoutKey = `login-lockout:${ip}`;
  
  // Check if IP is currently locked out
  const lockoutData = await redis.get(lockoutKey);
  if (lockoutData) {
    const lockoutUntil = typeof lockoutData === 'string' ? parseInt(lockoutData) : lockoutData as number;
    if (Date.now() < lockoutUntil) {
      const remainingSeconds = Math.ceil((lockoutUntil - Date.now()) / 1000);
      return { 
        allowed: false, 
        lockoutUntil: remainingSeconds 
      };
    } else {
      // Lockout expired, clean it up
      await redis.del(lockoutKey);
      await redis.del(attemptKey);
    }
  }
  
  // Check recent failed attempts
  const attempts = await redis.get(attemptKey);
  if (attempts) {
    const attemptCount = typeof attempts === 'string' ? parseInt(attempts) : attempts as number;
    if (attemptCount >= MAX_FAILED_ATTEMPTS) {
      // Calculate escalating lockout duration
      const lockoutDuration = await getLockoutDuration(ip);
      const lockoutUntil = Date.now() + (lockoutDuration * 1000);
      
      // Increment lockout history
      const historyKey = `${LOCKOUT_HISTORY_KEY}:${ip}`;
      const currentHistory = await redis.get(historyKey);
      const historyCount = currentHistory ? (typeof currentHistory === 'string' ? parseInt(currentHistory) : currentHistory as number) : 0;
      // Store history for 7 days
      await redis.setex(historyKey, 7 * 24 * 60 * 60, (historyCount + 1).toString());
      
      // Lock out the IP with escalating duration
      await redis.setex(lockoutKey, lockoutDuration, lockoutUntil.toString());
      return { 
        allowed: false, 
        lockoutUntil: lockoutDuration 
      };
    }
    return { 
      allowed: true, 
      remainingAttempts: MAX_FAILED_ATTEMPTS - attemptCount 
    };
  }
  
  return { allowed: true, remainingAttempts: MAX_FAILED_ATTEMPTS };
}

async function recordFailedAttempt(ip: string): Promise<void> {
  const attemptKey = `login-attempts:${ip}`;
  const attempts = await redis.get(attemptKey);
  const currentAttempts = attempts ? (typeof attempts === 'string' ? parseInt(attempts) : attempts as number) : 0;
  
  // Increment and set expiration
  await redis.setex(attemptKey, ATTEMPT_WINDOW, (currentAttempts + 1).toString());
}

async function clearFailedAttempts(ip: string): Promise<void> {
  const attemptKey = `login-attempts:${ip}`;
  await redis.del(attemptKey);
  // Note: We keep lockout history even after successful login
  // This allows escalating lockouts to persist across sessions
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for brute force protection
    const clientIP = getClientIP(request);
    
    // Check brute force protection
    const protection = await checkBruteForceProtection(clientIP);
    if (!protection.allowed) {
      return NextResponse.json({ 
        error: `Too many failed login attempts. Please try again in ${protection.lockoutUntil} seconds.` 
      }, { status: 429 }); // 429 Too Many Requests
    }
    
    const { password } = await request.json();
    
    // Validate password (server-side only, never exposed to client)
    const adminPassword = process.env.GALLERY_ADMIN_PASSWORD;
    
    if (!adminPassword) {
      return NextResponse.json({ 
        error: 'Server configuration error' 
      }, { status: 500 });
    }
    
    if (password !== adminPassword) {
      // Record failed attempt
      await recordFailedAttempt(clientIP);
      
      // Check if this was the last allowed attempt
      const updatedProtection = await checkBruteForceProtection(clientIP);
      if (!updatedProtection.allowed) {
        return NextResponse.json({ 
          error: `Too many failed login attempts. Your IP has been temporarily locked for ${updatedProtection.lockoutUntil} seconds.` 
        }, { status: 429 });
      }
      
      return NextResponse.json({ 
        error: 'Invalid password',
        remainingAttempts: updatedProtection.remainingAttempts
      }, { status: 401 });
    }
    
    // Successful login - clear any failed attempts
    await clearFailedAttempts(clientIP);
    
    // Generate secure random session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    // Store session in Redis with 8 hour expiration
    const sessionKey = `gallery-session:${sessionToken}`;
    await redis.setex(sessionKey, 8 * 60 * 60, JSON.stringify({
      authenticated: true,
      createdAt: Date.now(),
    }));
    
    return NextResponse.json({
      success: true,
      sessionToken,
      expiresIn: 8 * 60 * 60 * 1000, // 8 hours in ms
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      error: 'Login failed' 
    }, { status: 500 });
  }
}

