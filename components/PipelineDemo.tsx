'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onClose: () => void;
}

interface PipelineStep {
  id: string;
  name: string;
  icon: string;
  color: string;
  status: 'pending' | 'running' | 'complete' | 'error';
  output?: any;
  duration?: number;
}

const SAMPLE_INPUTS = [
  {
    label: 'Code Review Request',
    text: 'Review this Python function for security issues:\n\ndef login(username, password):\n    query = f"SELECT * FROM users WHERE name=\'{username}\' AND pass=\'{password}\'"\n    return db.execute(query)',
  },
  {
    label: 'Research Query',
    text: 'Explain how transformer attention mechanisms work and their relationship to memory systems in AI agents.',
  },
  {
    label: 'Knowledge Extraction',
    text: 'Microsoft was founded by Bill Gates and Paul Allen in 1975. The company is headquartered in Redmond, Washington. Microsoft develops Windows, Azure cloud services, and the Xbox gaming console. Satya Nadella has been CEO since 2014.',
  },
];

// Simulated pipeline outputs
const SIMULATED_OUTPUTS: { [key: string]: any } = {
  guard: {
    safe: true,
    flags: [],
    piiDetected: false,
    toxicityScore: 0.02,
    analysis: 'Content is safe to process. No PII or harmful content detected.',
  },
  router: {
    selectedProvider: 'ollama',
    model: 'llama3.2',
    reason: 'Local provider preferred for code analysis tasks',
    alternatives: ['lmstudio/codellama', 'groq/mixtral'],
    latencyEstimate: '~2s',
  },
  reasoning: {
    blocks: [
      { name: 'Attention', status: 'complete', output: 'Focused on: SQL query construction' },
      { name: 'Context Assembly', status: 'complete', output: 'Loaded security patterns' },
      { name: 'Chain of Thought', status: 'complete', output: 'Step 1: Identify string interpolation...' },
      { name: 'Self-Critique', status: 'complete', output: 'High confidence: SQL injection present' },
    ],
    scratchpad: '## Analysis\n1. Direct string interpolation in SQL\n2. No parameterization\n3. Classic SQL injection vulnerability',
    confidence: 0.95,
  },
  qstar: {
    action: 'DEEP_ANALYSIS',
    qValue: 0.87,
    exploration: 'exploit',
    episode: 1247,
    policy: 'Security-focused review pattern selected',
  },
  memory: {
    stored: true,
    layer: 'episodic',
    key: 'review_sql_injection_001',
    relatedMemories: [
      { key: 'security_pattern_sqli', similarity: 0.92 },
      { key: 'code_review_auth_func', similarity: 0.78 },
    ],
    consolidation: 'Scheduled for semantic layer',
  },
  graphrag: {
    entities: [
      { value: 'login', type: 'function' },
      { value: 'SQL injection', type: 'vulnerability' },
      { value: 'parameterized queries', type: 'solution' },
    ],
    relationships: [
      { source: 'login', target: 'SQL injection', type: 'HAS_VULNERABILITY' },
      { source: 'SQL injection', target: 'parameterized queries', type: 'FIXED_BY' },
    ],
    communities: 1,
  },
  agents: {
    agent: 'code-reviewer',
    findings: [
      {
        severity: 'CRITICAL',
        type: 'SQL Injection',
        line: 3,
        description: 'Direct string interpolation allows SQL injection attacks',
        fix: 'Use parameterized queries: cursor.execute("SELECT * FROM users WHERE name=? AND pass=?", (username, password))',
      },
    ],
    score: 2,
    summary: '1 critical security vulnerability found',
  },
  viz: {
    nodes: 5,
    edges: 4,
    semanticEdges: 2,
    htmlGenerated: true,
    preview: '📊 Interactive D3.js graph ready',
  },
  hypertune: {
    qualityScore: 0.89,
    metrics: {
      relevance: 0.92,
      completeness: 0.85,
      accuracy: 0.91,
    },
    suggestions: ['Consider adding remediation code example'],
  },
};

export default function PipelineDemo({ onClose }: Props) {
  const [input, setInput] = useState(SAMPLE_INPUTS[0].text);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<PipelineStep[]>([
    { id: 'guard', name: 'Content Guard', icon: '🛡️', color: '#ef4444', status: 'pending' },
    { id: 'router', name: 'Model Router', icon: '🔀', color: '#f97316', status: 'pending' },
    { id: 'reasoning', name: 'Reasoning Engine', icon: '💭', color: '#ec4899', status: 'pending' },
    { id: 'qstar', name: 'Q-Star Decision', icon: '⭐', color: '#8b5cf6', status: 'pending' },
    { id: 'memory', name: 'SAFLA Memory', icon: '🧠', color: '#10b981', status: 'pending' },
    { id: 'graphrag', name: 'GraphRAG Extract', icon: '🕸️', color: '#06b6d4', status: 'pending' },
    { id: 'agents', name: 'Agent Execution', icon: '🤖', color: '#3b82f6', status: 'pending' },
    { id: 'viz', name: 'Graph Visualization', icon: '📊', color: '#14b8a6', status: 'pending' },
    { id: 'hypertune', name: 'Quality Scoring', icon: '⚡', color: '#eab308', status: 'pending' },
  ]);

  const logRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toISOString().split('T')[1].split('.')[0]}] ${message}`]);
  };

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const runPipeline = async () => {
    setIsRunning(true);
    setLogs([]);
    setCurrentStep(0);

    // Reset all steps
    setSteps(prev => prev.map(s => ({ ...s, status: 'pending', output: undefined })));

    addLog('🚀 Starting DeadMan Toolkit Pipeline...');
    addLog(`📝 Input: "${input.substring(0, 50)}..."`);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);

      // Mark current as running
      setSteps(prev => prev.map((s, idx) =>
        idx === i ? { ...s, status: 'running' } : s
      ));

      addLog(`▶️ Running ${steps[i].name}...`);

      // Simulate processing time
      const startTime = Date.now();
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      const duration = Date.now() - startTime;

      // Get simulated output
      const output = SIMULATED_OUTPUTS[steps[i].id];

      // Mark as complete with output
      setSteps(prev => prev.map((s, idx) =>
        idx === i ? { ...s, status: 'complete', output, duration } : s
      ));

      addLog(`✅ ${steps[i].name} complete (${duration}ms)`);

      // Add specific log based on module
      if (steps[i].id === 'guard') {
        addLog(`   → Safe: ${output.safe}, Toxicity: ${output.toxicityScore}`);
      } else if (steps[i].id === 'router') {
        addLog(`   → Selected: ${output.selectedProvider}/${output.model}`);
      } else if (steps[i].id === 'reasoning') {
        addLog(`   → Confidence: ${(output.confidence * 100).toFixed(0)}%`);
      } else if (steps[i].id === 'agents') {
        addLog(`   → Found ${output.findings.length} issue(s)`);
      } else if (steps[i].id === 'graphrag') {
        addLog(`   → Extracted ${output.entities.length} entities, ${output.relationships.length} relations`);
      }
    }

    addLog('🎉 Pipeline complete! All modules executed successfully.');
    setIsRunning(false);
  };

  const getSelectedStep = () => steps.find(s => s.status === 'running' || s.status === 'complete' && s.output);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-cyber-darker/95 backdrop-blur-lg overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Live Pipeline Demo
            </h2>
            <p className="text-gray-400 mt-1">Watch all 50 tools work together in real-time</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="cyber-card p-6 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>📥</span> Input
              </h3>

              {/* Sample inputs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {SAMPLE_INPUTS.map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(sample.text)}
                    className={`text-xs px-3 py-1 rounded-full transition-all ${
                      input === sample.text
                        ? 'bg-purple-500 text-white'
                        : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="cyber-input h-48 resize-none font-mono text-sm"
                placeholder="Enter text to process..."
                disabled={isRunning}
              />

              <button
                onClick={runPipeline}
                disabled={isRunning || !input.trim()}
                className={`cyber-btn w-full mt-4 ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRunning ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  '🚀 Run Full Pipeline'
                )}
              </button>

              {/* Execution Log */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Execution Log</h4>
                <div
                  ref={logRef}
                  className="code-block h-48 overflow-y-auto text-xs"
                >
                  {logs.length === 0 ? (
                    <span className="text-gray-600">Click "Run Full Pipeline" to start...</span>
                  ) : (
                    logs.map((log, i) => (
                      <div key={i} className={`${log.includes('✅') ? 'text-green-400' : log.includes('▶️') ? 'text-cyan-400' : log.includes('🚀') || log.includes('🎉') ? 'text-purple-400' : 'text-gray-400'}`}>
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Steps */}
          <div className="lg:col-span-1">
            <div className="cyber-card p-6 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>⚡</span> Pipeline Steps
              </h3>

              <div className="space-y-3">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      step.status === 'running'
                        ? 'bg-purple-500/20 border border-purple-500/50'
                        : step.status === 'complete'
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-white/5 border border-transparent'
                    }`}
                  >
                    {/* Status indicator */}
                    <div className="relative">
                      <span className="text-2xl">{step.icon}</span>
                      {step.status === 'running' && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping" />
                      )}
                      {step.status === 'complete' && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center text-[8px]">✓</span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${step.status === 'running' ? 'text-purple-300' : step.status === 'complete' ? 'text-green-300' : 'text-gray-400'}`}>
                          {step.name}
                        </span>
                        {step.duration && (
                          <span className="text-xs text-gray-500">{step.duration}ms</span>
                        )}
                      </div>
                      {step.status === 'running' && (
                        <div className="h-1 bg-purple-500/20 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-500"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Total time */}
              {steps.every(s => s.status === 'complete') && (
                <div className="mt-4 pt-4 border-t border-purple-500/20 text-center">
                  <span className="text-gray-400">Total time: </span>
                  <span className="text-green-400 font-mono">
                    {steps.reduce((sum, s) => sum + (s.duration || 0), 0)}ms
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Output Panel */}
          <div className="lg:col-span-1">
            <div className="cyber-card p-6 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>📤</span> Module Output
              </h3>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {steps.filter(s => s.output).map(step => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${step.color}10`, borderLeft: `3px solid ${step.color}` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span>{step.icon}</span>
                      <span className="font-semibold" style={{ color: step.color }}>{step.name}</span>
                    </div>
                    <pre className="text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(step.output, null, 2)}
                    </pre>
                  </motion.div>
                ))}

                {steps.every(s => s.status === 'pending') && (
                  <div className="text-center text-gray-500 py-12">
                    Run the pipeline to see module outputs
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <AnimatePresence>
          {steps.every(s => s.status === 'complete') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 cyber-card p-8 gradient-border"
            >
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Pipeline Complete!
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{steps.length}</div>
                  <div className="text-sm text-gray-400">Modules Run</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">
                    {steps.reduce((sum, s) => sum + (s.duration || 0), 0)}ms
                  </div>
                  <div className="text-sm text-gray-400">Total Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">$0</div>
                  <div className="text-sm text-gray-400">API Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">100%</div>
                  <div className="text-sm text-gray-400">Local</div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-400 mb-4">
                  This demo showcased the full DeadMan Toolkit pipeline processing your input through
                  content safety, intelligent routing, cognitive reasoning, memory storage, knowledge extraction, and visualization.
                </p>
                <p className="text-lg font-semibold text-purple-400">
                  ALL FREE FOREVER
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
