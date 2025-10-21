import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { imageId } = await request.json();

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    // Read current gallery.json
    const galleryJsonPath = join(process.cwd(), 'src', 'data', 'gallery.json');

    let galleryData;
    try {
      const jsonData = await readFile(galleryJsonPath, 'utf8');
      galleryData = JSON.parse(jsonData);
    } catch {
      return NextResponse.json({ error: 'Gallery data not found' }, { status: 404 });
    }

    // Find the image to delete
    const imageIndex = galleryData.images.findIndex((img: { id: string }) => img.id === imageId);

    if (imageIndex === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const imageToDelete = galleryData.images[imageIndex];
    const filename = imageToDelete.filename;

    // Delete the physical file
    const filePath = join(process.cwd(), 'public', 'images', 'gallery', filename);

    if (existsSync(filePath)) {
      try {
        await unlink(filePath);
      } catch (error) {
        console.error('Error deleting file:', error);
        return NextResponse.json({ error: 'Failed to delete image file' }, { status: 500 });
      }
    }

    // Remove image from gallery data
    galleryData.images.splice(imageIndex, 1);

    // Update metadata
    galleryData.metadata.totalImages = galleryData.images.length;
    galleryData.metadata.lastUpdated = new Date().toISOString();

    // Write updated gallery.json
    await writeFile(galleryJsonPath, JSON.stringify(galleryData, null, 2));

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