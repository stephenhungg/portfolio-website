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
            blobUrl?: string;
            filename?: string;
            uploadDate: string;
          }>;
          metadata: { totalImages: number; lastUpdated: string };
        };
        if (galleryData) {
          return NextResponse.json(galleryData, {
            headers: {
              'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
              'CDN-Cache-Control': 'public, s-maxage=60',
              'Vercel-CDN-Cache-Control': 'public, s-maxage=60',
            },
          });
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
      return NextResponse.json(galleryData, {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      });
    } catch {
      // If no data source available, return empty
      return NextResponse.json({
        images: [],
        metadata: { totalImages: 0, lastUpdated: new Date().toISOString() }
      }, { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60',
        },
      });
    }
  } catch (error) {
    console.error('Error reading gallery data:', error);
    return NextResponse.json({
      images: [],
      metadata: { totalImages: 0, lastUpdated: new Date().toISOString() }
    }, { status: 200 });
  }
}