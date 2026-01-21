export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DeadMan Toolkit',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Complete AI development ecosystem with 50 free tools including model routing, GraphRAG, memory systems, reasoning engines, and more. Zero API costs.',
    featureList: [
      'Model Router - Intelligent routing across 10+ free LLM providers',
      'GraphRAG - Knowledge graph extraction and retrieval',
      'SAFLA Memory - Multi-layer memory system',
      'Reasoning Engine - 13-block cognitive pipeline',
      'Q-Star Agent - Reinforcement learning decisions',
      'LoRA Fine-Tuner - Parameter-efficient fine-tuning',
      'Unified Agents - Pre-built specialized agents',
      'Content Guard - Safety and validation',
      'Graph Visualization - D3.js semantic graphs',
      'AutoGen - Multi-agent conversations',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '50',
    },
    author: {
      '@type': 'Organization',
      name: 'DeadMan Toolkit',
      url: 'https://deadman-toolkit-demo.vercel.app',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
