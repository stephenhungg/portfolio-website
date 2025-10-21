import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    const { imageId } = await request.json();

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({
        error: 'Gallery delete is not available. Redis storage not configured.'
      }, { status: 503 });
    }

    // Get current gallery data
    let galleryData;
    try {
      galleryData = await redis.get('gallery-data') as {
        images: Array<{ id: string; blobUrl: string }>;
        metadata: { totalImages: number; lastUpdated: string };
      };
      if (!galleryData) {
        return NextResponse.json({ error: 'Gallery data not found' }, { status: 404 });
      }
    } catch {
      return NextResponse.json({ error: 'Gallery data not found' }, { status: 404 });
    }

    // Find the image to delete
    const imageIndex = galleryData.images.findIndex((img: { id: string }) => img.id === imageId);

    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const imageToDelete = galleryData.images[imageIndex];

    // Delete the image from Vercel Blob
    try {
      await del(imageToDelete.blobUrl);
    } catch (error) {
      console.error('Error deleting image from Vercel Blob:', error);
      return NextResponse.json({ error: 'Failed to delete image file' }, { status: 500 });
    }

    // Remove image from gallery data
    galleryData.images.splice(imageIndex, 1);

    // Update metadata
    galleryData.metadata.totalImages = galleryData.images.length;
    galleryData.metadata.lastUpdated = new Date().toISOString();

    // Save updated gallery data
    await redis.set('gallery-data', galleryData);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
      deletedImageId: imageId
    });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}