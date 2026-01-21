import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'DeadMan Toolkit - 50 FREE AI Tools'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0f',
          backgroundImage: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>💀</div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '10px',
            }}
          >
            50 FREE
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: 'white',
              marginBottom: '30px',
            }}
          >
            AI Tools
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
            }}
          >
            Zero API Costs • Works with Ollama, LM Studio, Groq
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
