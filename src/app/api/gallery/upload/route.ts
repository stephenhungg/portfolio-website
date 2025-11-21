import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    // Check if Redis is configured for metadata storage
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({
        error: 'Gallery upload is not available. Redis storage not configured.'
      }, { status: 503 });
    }

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
    
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const filename = `gallery_${timestamp}.${fileExtension}`;

    // Check if Vercel Blob is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({
        error: 'Vercel Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN in Vercel environment variables.',
        details: 'This is required for file uploads in production.'
      }, { status: 503 });
    }

    // Upload to Vercel Blob
    let blob;
    try {
      blob = await put(filename, file, {
      access: 'public',
    });
    } catch (blobError) {
      console.error('Vercel Blob upload error:', blobError);
      return NextResponse.json({
        error: 'Failed to upload file to Vercel Blob storage.',
        details: blobError instanceof Error ? blobError.message : 'Unknown blob storage error'
      }, { status: 500 });
    }

    // Get existing gallery data from Redis
    let galleryData: {
      images: Array<{
        id: string;
        title: string;
        description: string;
        uploadDate: string;
        blobUrl: string;
        uploadedBy: string;
      }>;
      metadata: { totalImages: number; lastUpdated: string };
    };
    try {
      const existingData = await redis.get('gallery-data') as {
        images: Array<{
          id: string;
          title: string;
          description: string;
          uploadDate: string;
          blobUrl: string;
          uploadedBy: string;
        }>;
        metadata: { totalImages: number; lastUpdated: string };
      } | null;
      galleryData = existingData || {
        images: [],
        metadata: { totalImages: 0, lastUpdated: new Date().toISOString() }
      };
    } catch {
      galleryData = {
        images: [],
        metadata: { totalImages: 0, lastUpdated: new Date().toISOString() }
      };
    }

    // Store image metadata
    const imageData = {
      id: `gallery_${timestamp}`,
      title: title || `Photo ${timestamp}`,
      description: description || '',
      uploadDate: new Date().toISOString().split('T')[0],
      blobUrl: blob.url,
      uploadedBy: 'admin'
    };

    // Add to gallery data
    galleryData.images.push(imageData);
    galleryData.metadata.totalImages = galleryData.images.length;
    galleryData.metadata.lastUpdated = new Date().toISOString();

    // Save updated gallery data to Redis
    try {
    await redis.set('gallery-data', galleryData);
      
      // Verify the save was successful by reading it back
      const verifyData = await redis.get('gallery-data');
      if (!verifyData || !Array.isArray((verifyData as any).images)) {
        throw new Error('Failed to verify Redis save');
      }
    } catch (redisError) {
      console.error('Redis save error:', redisError);
      // Try to delete the blob we just uploaded since metadata save failed
      try {
        await import('@vercel/blob').then(({ del }) => del(blob.url));
      } catch (deleteError) {
        console.error('Failed to clean up blob after Redis error:', deleteError);
      }
      return NextResponse.json({ 
        error: 'Failed to save image metadata. Upload may have partially succeeded.',
        details: redisError instanceof Error ? redisError.message : 'Unknown error'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      imageId: imageData.id,
      blobUrl: blob.url
    }, {
      headers: {
        // Invalidate cache for gallery list
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log full error details for debugging in Vercel
    console.error('Full error details:', {
      message: errorMessage,
      stack: errorStack,
      env: {
        hasRedis: !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
        hasBlob: !!process.env.BLOB_READ_WRITE_TOKEN
      }
    });
    
    return NextResponse.json({ 
      error: 'Upload failed',
      details: errorMessage,
      // Only include env info in development
      ...(process.env.NODE_ENV === 'development' && {
        debug: {
          hasRedis: !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
          hasBlob: !!process.env.BLOB_READ_WRITE_TOKEN
        }
      })
    }, { status: 500 });
  }
}