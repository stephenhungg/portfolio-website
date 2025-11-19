import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Validate password (server-side only, never exposed to client)
    const adminPassword = process.env.GALLERY_ADMIN_PASSWORD;
    
    if (!adminPassword) {
      return NextResponse.json({ 
        error: 'Server configuration error' 
      }, { status: 500 });
    }
    
    if (password !== adminPassword) {
      return NextResponse.json({ 
        error: 'Invalid password' 
      }, { status: 401 });
    }
    
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

