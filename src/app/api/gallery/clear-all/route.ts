import { NextRequest, NextResponse } from 'next/server';
import { list, del } from '@vercel/blob';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    // **AUTHENTICATION CHECK** - Verify session token
    const sessionToken = request.headers.get('x-session-token');
    
    if (!sessionToken) {
      return NextResponse.json({ 
        error: 'Unauthorized. No session token provided.' 
      }, { status: 401 });
    }
    
    // Validate session exists in Redis
    const sessionKey = `gallery-session:${sessionToken}`;
    const session = await redis.get(sessionKey);
    
    if (!session) {
      return NextResponse.json({ 
        error: 'Unauthorized. Invalid or expired session.' 
      }, { status: 401 });
    }

    // Get all blobs
    const { blobs } = await list();
    
    // Filter gallery images (only delete gallery_ prefixed files)
    const galleryBlobs = blobs.filter(blob => 
      blob.pathname.startsWith('gallery_')
    );

    // Delete all gallery blobs
    const deletePromises = galleryBlobs.map(blob => del(blob.url));
    await Promise.all(deletePromises);

    // Clear Redis gallery data
    await redis.set('gallery-data', {
      images: [],
      metadata: { 
        totalImages: 0, 
        lastUpdated: new Date().toISOString() 
      }
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${galleryBlobs.length} images`,
      deletedCount: galleryBlobs.length
    });

  } catch (error) {
    console.error('Clear all error:', error);
    return NextResponse.json({ 
      error: 'Failed to clear gallery' 
    }, { status: 500 });
  }
}

