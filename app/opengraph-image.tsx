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
        {/* Purple glow effect */}
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

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: '80px',
              marginBottom: '20px',
            }}
          >
            💀
          </div>

          {/* Title */}
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

          {/* Subtitle */}
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              marginBottom: '40px',
            }}
          >
            Complete AI Development Ecosystem • Zero API Costs
          </div>

          {/* Features row */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
            }}
          >
            {['GraphRAG', 'Memory', 'Reasoning', 'Agents', 'LoRA'].map((feature) => (
              <div
                key={feature}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: '20px',
                  color: '#a78bfa',
                  fontSize: '20px',
                }}
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Bottom tagline */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              fontSize: '24px',
              color: '#8b5cf6',
              fontFamily: 'monospace',
            }}
          >
            ALL FREE FOREVER
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
