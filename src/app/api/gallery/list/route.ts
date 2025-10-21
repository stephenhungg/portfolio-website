import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const galleryJsonPath = join(process.cwd(), 'src', 'data', 'gallery.json');
    const jsonData = await readFile(galleryJsonPath, 'utf8');
    const galleryData = JSON.parse(jsonData);

    return NextResponse.json(galleryData);
  } catch (error) {
    console.error('Error reading gallery data:', error);
    return NextResponse.json({
      images: [],
      metadata: { totalImages: 0, lastUpdated: new Date().toISOString() }
    }, { status: 200 });
  }
}