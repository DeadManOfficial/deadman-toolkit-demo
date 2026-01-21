'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import ModuleCard from '@/components/ModuleCard';
import PipelineDemo from '@/components/PipelineDemo';
import LiveDemo from '@/components/LiveDemo';
import ToolsGrid from '@/components/ToolsGrid';
import SocialLinks from '@/components/SocialLinks';

const MODULES = [
  {
    id: 'router',
    name: 'Model Router',
    icon: '🔀',
    color: '#f97316',
    tools: 4,
    description: 'Intelligent routing across 10+ free LLM providers',
    features: ['Ollama', 'LM Studio', 'Groq', 'Together AI', 'Load balancing', 'Fallback chains']
  },
  {
    id: 'guard',
    name: 'Content Guard',
    icon: '🛡️',
    color: '#ef4444',
    tools: 3,
    description: 'Safety guardrails and content validation',
    features: ['PII detection', 'Toxicity filtering', 'Prompt injection defense', 'Custom rules']
  },
  {
    id: 'qstar',
    name: 'Q-Star Agent',
    icon: '⭐',
    color: '#8b5cf6',
    tools: 4,
    description: 'Reinforcement learning decision engine',
    features: ['Q-learning', 'Epsilon-greedy', 'Experience replay', 'Policy optimization']
  },
  {
    id: 'graphrag',
    name: 'GraphRAG',
    icon: '🕸️',
    color: '#06b6d4',
    tools: 3,
    description: 'Knowledge graph extraction and RAG',
    features: ['Entity extraction', 'Relationship detection', 'Community detection', 'Graph queries']
  },
  {
    id: 'memory',
    name: 'SAFLA Memory',
    icon: '🧠',
    color: '#10b981',
    tools: 5,
    description: 'Multi-layer memory system',
    features: ['Episodic memory', 'Semantic memory', 'Working memory', 'Procedural memory', 'Consolidation']
  },
  {
    id: 'reasoning',
    name: 'Reasoning Engine',
    icon: '💭',
    color: '#ec4899',
    tools: 4,
    description: '13-block cognitive pipeline',
    features: ['Attention', 'Context assembly', 'Chain of thought', 'Self-critique', 'Meta-cognition']
  },
  {
    id: 'agents',
    name: 'Unified Agents',
    icon: '🤖',
    color: '#3b82f6',
    tools: 5,
    description: 'Pre-built specialized agents',
    features: ['Code reviewer', 'Researcher', 'Planner', 'Debugger', 'Architect']
  },
  {
    id: 'lora',
    name: 'LoRA Fine-Tuner',
    icon: '🎯',
    color: '#f59e0b',
    tools: 4,
    description: 'Parameter-efficient fine-tuning',
    features: ['Config generation', 'Data preparation', 'Training scripts', 'Adapter management']
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    icon: '💬',
    color: '#a855f7',
    tools: 4,
    description: 'Multi-agent conversation patterns',
    features: ['Two-agent chat', 'Group chat', 'Hierarchical', 'Custom patterns']
  },
  {
    id: 'viz',
    name: 'Graph Viz',
    icon: '📊',
    color: '#14b8a6',
    tools: 3,
    description: 'Semantic graph visualization',
    features: ['D3.js rendering', 'Semantic edges', 'Interactive HTML', 'GraphRAG integration']
  },
  {
    id: 'hypertune',
    name: 'HyperTune',
    icon: '⚡',
    color: '#eab308',
    tools: 3,
    description: 'Response quality optimization',
    features: ['Quality scoring', 'Parameter tuning', 'A/B testing', 'Metrics tracking']
  },
  {
    id: 'promptgen',
    name: 'Prompt Generator',
    icon: '✨',
    color: '#22c55e',
    tools: 3,
    description: 'AI persona and prompt templates',
    features: ['Persona generation', 'Template library', 'System prompts', 'Few-shot examples']
  }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedModule, setSelectedModule] = useState<typeof MODULES[0] | null>(null);
  const [showPipeline, setShowPipeline] = useState(false);

  const totalTools = MODULES.reduce((sum, m) => sum + m.tools, 0);

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💀</span>
            <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              DeadMan Toolkit
            </span>
            <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-full text-purple-300">v5.1</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveSection('modules')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Modules
            </button>
            <button
              onClick={() => setActiveSection('architecture')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Architecture
            </button>
            <button
              onClick={() => setShowPipeline(true)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Live Demo
            </button>
            <a
              href="https://github.com/anthropics/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn text-sm py-2 px-4"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                {totalTools} FREE
              </span>
              <br />
              <span className="text-white">AI Tools</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-3xl mx-auto">
              Complete AI development ecosystem with{' '}
              <span className="text-cyan-400 font-semibold">zero API costs</span>
            </p>

            <p className="text-lg text-purple-400 font-mono mb-12">
              ALL FREE FOREVER
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button
                onClick={() => setShowPipeline(true)}
                className="cyber-btn text-lg px-8 py-4"
              >
                🚀 Launch Live Demo
              </button>
              <button
                onClick={() => setActiveSection('architecture')}
                className="px-8 py-4 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-500/10 transition-all"
              >
                📐 View Architecture
              </button>
            </div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: 'MCP Tools', value: totalTools, color: 'purple' },
              { label: 'Modules', value: MODULES.length, color: 'cyan' },
              { label: 'LLM Providers', value: '10+', color: 'green' },
              { label: 'API Cost', value: '$0', color: 'pink' },
            ].map((stat, i) => (
              <div key={i} className="cyber-card p-6 text-center">
                <div className={`text-4xl font-bold text-${stat.color}-400 mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-4"
          >
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Modular Architecture
            </span>
          </motion.h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Each module is independent, composable, and works with free/local LLMs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MODULES.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                onClick={() => setSelectedModule(module)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              System Architecture
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Interactive visualization of how modules connect and communicate
          </p>

          <ArchitectureDiagram modules={MODULES} />
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              All {totalTools} Tools
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Every tool exposed via MCP protocol
          </p>

          <ToolsGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="cyber-card p-12 gradient-border">
            <h2 className="text-4xl font-bold mb-6">Ready to Build?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Start using the toolkit locally or integrate via MCP
            </p>
            <div className="code-block text-left mb-8 text-green-400">
              <span className="text-gray-500"># Start the MCP server</span><br/>
              node mcp-server/server.js<br/>
              <br/>
              <span className="text-gray-500"># Or use with Claude Code</span><br/>
              claude --mcp-server ./mcp-server<br/>
              <br/>
              <span className="text-gray-500"># 50 tools now available!</span>
            </div>
            <button
              onClick={() => setShowPipeline(true)}
              className="cyber-btn text-lg px-8 py-4"
            >
              Try Interactive Demo
            </button>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <SocialLinks variant="footer" showCTA={true} />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💀</span>
            <span className="text-gray-400">DeadMan Toolkit v5.1</span>
          </div>
          <SocialLinks variant="inline" />
          <div className="text-gray-500 text-sm">
            ALL FREE FOREVER
          </div>
        </div>
      </footer>

      {/* Floating Social Links */}
      <SocialLinks variant="floating" />

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="cyber-card p-8 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl">{selectedModule.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold">{selectedModule.name}</h3>
                  <p className="text-gray-400">{selectedModule.tools} tools</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6">{selectedModule.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedModule.features.map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${selectedModule.color}20`,
                      color: selectedModule.color
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="cyber-btn w-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline Demo Modal */}
      <AnimatePresence>
        {showPipeline && (
          <PipelineDemo onClose={() => setShowPipeline(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
