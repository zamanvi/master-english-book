import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Free OSHA Safety Briefing & Sign-In Sheet Generator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          fontFamily: 'Arial, Helvetica, sans-serif',
          color: 'white',
          padding: '70px 80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          <span style={{ marginRight: 16 }}>⚠️</span>
          <span>Free OSHA Safety Briefing &amp; Sign-In Sheet Generator</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            color: '#e0e7ff',
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          Generate in 30 Seconds · 100% Free PDF
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 16,
            padding: '30px 40px',
            width: 1040,
          }}
        >
          {[
            'OSHA Compliant (29 CFR 1904)',
            'Instantly Generate & Download PDF',
            '7 Pre-Built Safety Topics',
            'Print or Email Ready',
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 27,
                fontWeight: 700,
                marginBottom: i === 3 ? 0 : 18,
              }}
            >
              <span style={{ marginRight: 14 }}>✅</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 36,
            left: 0,
            right: 0,
            justifyContent: 'center',
            fontSize: 24,
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 600,
          }}
        >
          masterenglishbook.com/international/osha-safety-tool
        </div>
      </div>
    ),
    { ...size }
  );
}
