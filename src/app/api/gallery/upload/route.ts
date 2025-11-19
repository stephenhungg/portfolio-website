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

    // **AUTHENTICATION CHECK** - Verify auth token from headers
    const authToken = request.headers.get('x-gallery-auth-token');
    const serverToken = process.env.GALLERY_AUTH_TOKEN;
    
    if (!authToken || !serverToken || authToken !== serverToken) {
      return NextResponse.json({ 
        error: 'Unauthorized. Valid authentication required.' 
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

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

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
    await redis.set('gallery-data', galleryData);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      imageId: imageData.id,
      blobUrl: blob.url
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}