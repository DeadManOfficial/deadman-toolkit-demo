import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import StructuredData from './structured-data'

export const metadata: Metadata = {
  metadataBase: new URL('https://deadman-toolkit-demo.vercel.app'),
  title: {
    default: 'DeadMan Toolkit - 50 FREE AI Tools | No API Costs',
    template: '%s | DeadMan Toolkit'
  },
  description: 'Complete AI development ecosystem with 50 free tools: Model routing, GraphRAG, memory systems, reasoning engines, LoRA fine-tuning, and more. Zero API costs. Works with Ollama, LM Studio, Groq.',
  keywords: [
    'AI toolkit', 'free AI tools', 'LLM', 'RAG', 'GraphRAG',
    'AI agents', 'memory systems', 'reasoning engine', 'Ollama',
    'LM Studio', 'Groq', 'LoRA', 'fine-tuning', 'MCP server',
    'Claude Code', 'open source AI', 'local LLM', 'free LLM'
  ],
  authors: [{ name: 'DeadMan Toolkit', url: 'https://deadman-toolkit-demo.vercel.app' }],
  creator: 'DeadMan Toolkit',
  publisher: 'DeadMan Toolkit',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://deadman-toolkit-demo.vercel.app',
    siteName: 'DeadMan Toolkit',
    title: 'DeadMan Toolkit - 50 FREE AI Tools',
    description: 'Complete AI development ecosystem with zero API costs. Model routing, GraphRAG, memory systems, reasoning engines, and more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DeadMan Toolkit - 50 FREE AI Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeadMan Toolkit - 50 FREE AI Tools',
    description: 'Complete AI development ecosystem with zero API costs',
    images: ['/og-image.png'],
    creator: '@deadmantoolkit',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://deadman-toolkit-demo.vercel.app',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className="font-['Inter'] antialiased">
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
