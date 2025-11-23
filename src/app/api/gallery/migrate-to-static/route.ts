import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    // Authentication check - you should secure this endpoint!
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.GALLERY_ADMIN_PASSWORD}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({
        error: 'Redis storage not configured.'
      }, { status: 503 });
    }

    // Get gallery data from Redis
    const galleryData = await redis.get('gallery-data') as {
      images: Array<{
        id: string;
        title: string;
        description: string;
        uploadDate: string;
        blobUrl?: string;
        filename?: string;
        uploadedBy: string;
      }>;
      metadata: { totalImages: number; lastUpdated: string };
    } | null;

    if (!galleryData || !galleryData.images || galleryData.images.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No images found to migrate',
        migrated: 0
      });
    }

    // Ensure gallery directory exists
    const galleryDir = join(process.cwd(), 'public', 'images', 'gallery');
    if (!existsSync(galleryDir)) {
      await mkdir(galleryDir, { recursive: true });
    }

    const migratedImages: Array<{ id: string; filename: string; blobUrl: string }> = [];
    const errors: Array<{ id: string; error: string }> = [];

    // Download each image from blob and save locally
    for (const image of galleryData.images) {
      try {
        // Skip if already has a filename (already static)
        const staticFilename = image.filename;
        if (staticFilename && typeof staticFilename === 'string' && !image.blobUrl) {
          console.log(`Skipping ${image.id} - already static with filename: ${staticFilename}`);
          migratedImages.push({
            id: image.id,
            filename: staticFilename,
            blobUrl: ''
          });
          continue;
        }

        // Skip if no blobUrl
        if (!image.blobUrl) {
          console.log(`Skipping ${image.id} - no blobUrl and no filename`);
          continue;
        }

        // Extract filename from blob URL or create one from image ID
        const urlParts = image.blobUrl.split('/');
        const blobFilename = urlParts[urlParts.length - 1]?.split('?')[0] || `${image.id}.jpg`;
        
        // Determine file extension from blob URL or default to .jpg
        let extension = 'jpg';
        if (blobFilename.includes('.')) {
          extension = blobFilename.split('.').pop() || 'jpg';
        }

        // Create local filename
        const localFilename = `gallery_${image.id}.${extension}`;
        const localPath = join(galleryDir, localFilename);

        // Skip if file already exists
        if (existsSync(localPath)) {
          console.log(`File already exists for ${image.id}: ${localFilename}`);
          migratedImages.push({
            id: image.id,
            filename: localFilename,
            blobUrl: image.blobUrl
          });
          continue;
        }

        // Download image from blob URL
        console.log(`Downloading ${image.id} from ${image.blobUrl}...`);
        const response = await fetch(image.blobUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
        }

        const imageBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);

        // Save to local file
        await writeFile(localPath, buffer);
        console.log(`Saved ${image.id} as ${localFilename}`);

        migratedImages.push({
          id: image.id,
          filename: localFilename,
          blobUrl: image.blobUrl
        });

      } catch (error) {
        console.error(`Error migrating ${image.id}:`, error);
        errors.push({
          id: image.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Update gallery data to use local filenames instead of blob URLs
    const updatedImages = galleryData.images.map(image => {
      const migrated = migratedImages.find(m => m.id === image.id);
      if (migrated && migrated.filename) {
        // Create new object without blobUrl, using filename instead
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { blobUrl, ...rest } = image;
        return {
          ...rest,
          filename: migrated.filename,
        };
      }
      // Keep images that already have filenames
      if ('filename' in image && image.filename) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { blobUrl, ...rest } = image;
        return rest;
      }
      return image;
    });

    const updatedGalleryData = {
      images: updatedImages,
      metadata: {
        ...galleryData.metadata,
        lastUpdated: new Date().toISOString()
      }
    };

    // Update Redis with new data
    await redis.set('gallery-data', updatedGalleryData);

    // Also save to local JSON file as backup
    const jsonPath = join(process.cwd(), 'src', 'data', 'gallery.json');
    const jsonDir = join(process.cwd(), 'src', 'data');
    if (!existsSync(jsonDir)) {
      await mkdir(jsonDir, { recursive: true });
    }
    await writeFile(jsonPath, JSON.stringify(updatedGalleryData, null, 2));

    return NextResponse.json({
      success: true,
      message: `Migration completed: ${migratedImages.length} images migrated`,
      migrated: migratedImages.length,
      total: galleryData.images.length,
      errors: errors.length > 0 ? errors : undefined,
      updatedImages: updatedImages.map(img => ({
        id: img.id,
        filename: img.filename,
        title: img.title
      }))
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({
      error: 'Migration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
