/**
 * Migration script to download all images from Vercel Blob storage
 * and save them as static files in public/images/gallery/
 * 
 * Usage: npx tsx scripts/migrate-blob-to-static.ts
 * 
 * Make sure to set these environment variables in .env.local:
 * - UPSTASH_REDIS_REST_URL
 * - UPSTASH_REDIS_REST_TOKEN
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { Redis } from '@upstash/redis';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

async function migrateBlobToStatic() {
  try {
    console.log('🚀 Starting migration from Blob storage to static files...\n');

    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error('Redis storage not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
    }

    // Get gallery data from Redis
    console.log('📥 Fetching gallery data from Redis...');
    const galleryData = await redis.get('gallery-data') as {
      images: Array<{
        id: string;
        title: string;
        description: string;
        uploadDate: string;
        blobUrl?: string;
        filename?: string;
        uploadedBy?: string;
      }>;
      metadata: { totalImages: number; lastUpdated: string };
    } | null;

    if (!galleryData || !galleryData.images || galleryData.images.length === 0) {
      console.log('ℹ️  No images found in gallery data.');
      return;
    }

    console.log(`📊 Found ${galleryData.images.length} images in gallery.\n`);

    // Ensure gallery directory exists
    const galleryDir = join(process.cwd(), 'public', 'images', 'gallery');
    if (!existsSync(galleryDir)) {
      await mkdir(galleryDir, { recursive: true });
      console.log(`📁 Created directory: ${galleryDir}\n`);
    }

    const migratedImages: Array<{ id: string; filename: string }> = [];
    const skippedImages: Array<{ id: string; reason: string }> = [];
    const errors: Array<{ id: string; error: string }> = [];

    // Download each image from blob and save locally
    for (let i = 0; i < galleryData.images.length; i++) {
      const image = galleryData.images[i];
      console.log(`[${i + 1}/${galleryData.images.length}] Processing ${image.id}...`);

      try {
        // Skip if already has a filename (already static)
        if (image.filename && !image.blobUrl) {
          console.log(`  ⏭️  Already static: ${image.filename}\n`);
          skippedImages.push({ id: image.id, reason: 'Already static' });
          migratedImages.push({ id: image.id, filename: image.filename });
          continue;
        }

        // Skip if no blobUrl
        if (!image.blobUrl) {
          console.log(`  ⏭️  No blob URL found\n`);
          skippedImages.push({ id: image.id, reason: 'No blob URL' });
          continue;
        }

        // Extract file extension from blob URL or image ID
        let extension = 'jpg';
        try {
          const urlParts = image.blobUrl.split('/');
          const blobFilename = urlParts[urlParts.length - 1]?.split('?')[0] || '';
          if (blobFilename.includes('.')) {
            const ext = blobFilename.split('.').pop()?.toLowerCase();
            if (ext && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'JPEG'].includes(ext)) {
              extension = ext;
            }
          }
        } catch (e) {
          // Use default extension
        }

        // Create local filename
        const localFilename = `gallery_${image.id}.${extension}`;
        const localPath = join(galleryDir, localFilename);

        // Skip if file already exists
        if (existsSync(localPath)) {
          console.log(`  ✅ File already exists: ${localFilename}\n`);
          migratedImages.push({ id: image.id, filename: localFilename });
          continue;
        }

        // Download image from blob URL
        console.log(`  📥 Downloading from ${image.blobUrl}...`);
        const response = await fetch(image.blobUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const imageBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);

        // Save to local file
        await writeFile(localPath, buffer);
        console.log(`  ✅ Saved as ${localFilename} (${(buffer.length / 1024).toFixed(2)} KB)\n`);

        migratedImages.push({ id: image.id, filename: localFilename });

      } catch (error) {
        console.error(`  ❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
        errors.push({
          id: image.id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Update gallery data to use local filenames instead of blob URLs
    console.log('🔄 Updating gallery data...');
    const updatedImages = galleryData.images.map(image => {
      const migrated = migratedImages.find(m => m.id === image.id);
      if (migrated && migrated.filename) {
        // Remove blobUrl, keep filename
        const { blobUrl, ...rest } = image as any;
        return {
          ...rest,
          filename: migrated.filename,
        };
      }
      // Keep images that already have filenames
      if (image.filename) {
        const { blobUrl, ...rest } = image as any;
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
    console.log('💾 Updating Redis...');
    await redis.set('gallery-data', updatedGalleryData);

    // Also save to local JSON file as backup
    const jsonPath = join(process.cwd(), 'src', 'data', 'gallery.json');
    const jsonDir = join(process.cwd(), 'src', 'data');
    if (!existsSync(jsonDir)) {
      await mkdir(jsonDir, { recursive: true });
    }
    await writeFile(jsonPath, JSON.stringify(updatedGalleryData, null, 2));
    console.log('💾 Saved backup to gallery.json\n');

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Migration complete!');
    console.log(`   ✅ Migrated: ${migratedImages.length} images`);
    console.log(`   ⏭️  Skipped: ${skippedImages.length} images`);
    if (errors.length > 0) {
      console.log(`   ❌ Errors: ${errors.length} images`);
      console.log('\n   Failed images:');
      errors.forEach(e => {
        console.log(`     - ${e.id}: ${e.error}`);
      });
    }
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    if (error instanceof Error) {
      console.error('   Error:', error.message);
    }
    process.exit(1);
  }
}

// Run migration
migrateBlobToStatic().then(() => {
  console.log('🎉 Done!');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
