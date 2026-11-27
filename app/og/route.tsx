import { ImageResponse } from 'next/og';

// Default 1200×630 social preview card. Optional ?title= and ?subtitle= override the text.
export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get('title') || 'Full-stack Engineer').slice(0, 90);
  const subtitle = (
    searchParams.get('subtitle') || 'Building scalable SaaS products, media infrastructure and developer tools with React, Next.js and Node.js'
  ).slice(0, 140);
  const photo = new URL('/milan_katira.jpeg', request.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1c1f33 0%, #000319 70%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={72} height={72} style={{ borderRadius: 999, border: '2px solid rgba(255,255,255,0.2)' }} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, fontWeight: 600 }}>Milan Katira</span>
            <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.5)' }}>milankatira.com</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span style={{ fontSize: title.length > 50 ? 60 : 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</span>
          <span style={{ fontSize: 30, color: 'rgba(255,255,255,0.6)', lineHeight: 1.35 }}>{subtitle}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable' },
    },
  );
}
