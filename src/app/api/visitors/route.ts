import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VISITOR_FILE = path.join(process.cwd(), 'visitor-count.json');

// Initialize visitor count file if it doesn't exist
function initializeVisitorFile() {
  if (!fs.existsSync(VISITOR_FILE)) {
    fs.writeFileSync(VISITOR_FILE, JSON.stringify({ count: 0, lastReset: new Date().toISOString() }));
  }
}

// Read current visitor count
function getVisitorCount(): number {
  try {
    initializeVisitorFile();
    const data = JSON.parse(fs.readFileSync(VISITOR_FILE, 'utf8'));
    return data.count || 0;
  } catch (error) {
    console.error('Error reading visitor count:', error);
    return 0;
  }
}

// Increment visitor count
function incrementVisitorCount(): number {
  try {
    initializeVisitorFile();
    const data = JSON.parse(fs.readFileSync(VISITOR_FILE, 'utf8'));
    data.count = (data.count || 0) + 1;
    data.lastReset = new Date().toISOString();
    fs.writeFileSync(VISITOR_FILE, JSON.stringify(data, null, 2));
    return data.count;
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return getVisitorCount();
  }
}

export async function GET(request: NextRequest) {
  const count = getVisitorCount();
  return NextResponse.json({ count });
}

export async function POST(request: NextRequest) {
  const count = incrementVisitorCount();
  return NextResponse.json({ count });
} 