import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    const count = await redis.get('visitor-count') as number || 0;
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    const count = await redis.incr('visitor-count');
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error incrementing visitor count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
