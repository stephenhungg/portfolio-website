import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
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

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure gallery directory exists
    const galleryDir = join(process.cwd(), 'public', 'images', 'gallery');
    if (!existsSync(galleryDir)) {
      mkdirSync(galleryDir, { recursive: true });
    }

    // Write file to gallery directory
    const filePath = join(galleryDir, filename);
    await writeFile(filePath, buffer);

    // Read existing gallery.json
    const galleryJsonPath = join(process.cwd(), 'src', 'data', 'gallery.json');
    let galleryData;

    try {
      const jsonData = await readFile(galleryJsonPath, 'utf8');
      galleryData = JSON.parse(jsonData);
    } catch {
      // If file doesn't exist, create new structure
      galleryData = {
        images: [],
        metadata: { totalImages: 0, lastUpdated: new Date().toISOString() }
      };
    }

    // Add new image data
    const newImage = {
      id: `gallery_${timestamp}`,
      filename,
      title: title || `Photo ${timestamp}`,
      description: description || '',
      uploadDate: new Date().toISOString().split('T')[0],
      dimensions: '800x600', // You could implement actual dimension detection here
      uploadedBy: 'admin'
    };

    galleryData.images.push(newImage);
    galleryData.metadata.totalImages = galleryData.images.length;
    galleryData.metadata.lastUpdated = new Date().toISOString();

    // Write updated gallery.json
    await writeFile(galleryJsonPath, JSON.stringify(galleryData, null, 2));

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      filename
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}