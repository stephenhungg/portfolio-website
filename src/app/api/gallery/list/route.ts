import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { readFile } from 'fs/promises';
import { join } from 'path';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET() {
  try {
    // Try Redis first (for production)
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        const galleryData = await redis.get('gallery-data') as {
          images: Array<{
            id: string;
            title?: string;
            description?: string;
            blobUrl: string;
            uploadDate: string;
          }>;
          metadata: { totalImages: number; lastUpdated: string };
        };
        if (galleryData) {
          return NextResponse.json(galleryData);
        }
      } catch (error) {
        console.error('Error reading from Redis:', error);
      }
    }

    // Fallback to local JSON file (for development)
    try {
      const galleryJsonPath = join(process.cwd(), 'src', 'data', 'gallery.json');
      const jsonData = await readFile(galleryJsonPath, 'utf8');
      const galleryData = JSON.parse(jsonData);
      return NextResponse.json(galleryData);
    } catch {
      // If no data source available, return empty
      return NextResponse.json({
        images: [],
        metadata: { totalImages: 0, lastUpdated: new Date().toISOString() }
      }, { status: 200 });
    }
  } catch (error) {
    console.error('Error reading gallery data:', error);
    return NextResponse.json({
      images: [],
      metadata: { totalImages: 0, lastUpdated: new Date().toISOString() }
    }, { status: 200 });
  }
}