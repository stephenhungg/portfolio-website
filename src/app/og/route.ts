import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// 1200x630 Open Graph image
export async function GET() {
  const width = 1200;
  const height = 630;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: '#0a0a0a',
          color: '#ffffff',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: -1.5,
            lineHeight: 1.1,
          }}
        >
          Stephen Hung — UC Berkeley EECS
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 36,
            color: '#cfcfcf',
          }}
        >
          Full-Stack Developer & ML/AI
        </div>
        <div
          style={{
            marginTop: 40,
            height: 2,
            width: '100%',
            background: 'linear-gradient(90deg, #22c55e, #06b6d4, #a78bfa)',
          }}
        />
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: '#a3a3a3',
          }}
        >
          stephenhung.me
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
}


