'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DemoModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  inputs: { name: string; type: string; placeholder: string }[];
  run: (inputs: any) => Promise<any>;
}

const DEMOS: DemoModule[] = [
  {
    id: 'guard',
    name: 'Content Guard',
    icon: '🛡️',
    description: 'Analyze content for safety, PII, and toxicity',
    inputs: [{ name: 'content', type: 'textarea', placeholder: 'Enter text to analyze...' }],
    run: async (inputs) => ({
      safe: !inputs.content.toLowerCase().includes('hack'),
      piiDetected: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(inputs.content),
      toxicityScore: Math.random() * 0.1,
      flags: [],
    }),
  },
  {
    id: 'router',
    name: 'Model Router',
    icon: '🔀',
    description: 'Find the best free LLM provider for your task',
    inputs: [
      { name: 'task', type: 'select', placeholder: 'code|chat|creative|analysis' },
      { name: 'priority', type: 'select', placeholder: 'speed|quality|cost' },
    ],
    run: async (inputs) => ({
      recommended: 'ollama/llama3.2',
      alternatives: ['lmstudio/codellama', 'groq/mixtral-8x7b'],
      reason: `Best for ${inputs.task} with ${inputs.priority} priority`,
      providers: { ollama: 'available', lmstudio: 'available', groq: 'available' },
    }),
  },
  {
    id: 'graphrag',
    name: 'GraphRAG',
    icon: '🕸️',
    description: 'Extract entities and relationships from text',
    inputs: [{ name: 'text', type: 'textarea', placeholder: 'Enter text for knowledge extraction...' }],
    run: async (inputs) => {
      const entities = inputs.text.match(/[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*/g) || [];
      return {
        entities: [...new Set(entities)].slice(0, 5).map(e => ({ value: e, type: 'entity' })),
        relationships: entities.length > 1 ? [{ source: entities[0], target: entities[1], type: 'RELATED_TO' }] : [],
        nodeCount: entities.length,
      };
    },
  },
];

export default function LiveDemo() {
  const [selectedDemo, setSelectedDemo] = useState<DemoModule | null>(null);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [output, setOutput] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runDemo = async () => {
    if (!selectedDemo) return;
    setIsRunning(true);
    setOutput(null);

    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
    const result = await selectedDemo.run(inputs);

    setOutput(result);
    setIsRunning(false);
  };

  return (
    <div className="cyber-card p-6">
      <h3 className="text-xl font-semibold mb-6">Try Individual Modules</h3>

      {/* Module selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {DEMOS.map(demo => (
          <button
            key={demo.id}
            onClick={() => {
              setSelectedDemo(demo);
              setInputs({});
              setOutput(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedDemo?.id === demo.id
                ? 'bg-purple-500 text-white'
                : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
            }`}
          >
            <span>{demo.icon}</span>
            <span>{demo.name}</span>
          </button>
        ))}
      </div>

      {selectedDemo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-400 mb-4">{selectedDemo.description}</p>

          {/* Inputs */}
          <div className="space-y-4 mb-4">
            {selectedDemo.inputs.map(input => (
              <div key={input.name}>
                <label className="text-sm text-gray-400 mb-1 block capitalize">{input.name}</label>
                {input.type === 'textarea' ? (
                  <textarea
                    value={inputs[input.name] || ''}
                    onChange={(e) => setInputs({ ...inputs, [input.name]: e.target.value })}
                    className="cyber-input h-24"
                    placeholder={input.placeholder}
                  />
                ) : input.type === 'select' ? (
                  <select
                    value={inputs[input.name] || ''}
                    onChange={(e) => setInputs({ ...inputs, [input.name]: e.target.value })}
                    className="cyber-input"
                  >
                    <option value="">Select...</option>
                    {input.placeholder.split('|').map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={inputs[input.name] || ''}
                    onChange={(e) => setInputs({ ...inputs, [input.name]: e.target.value })}
                    className="cyber-input"
                    placeholder={input.placeholder}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={runDemo}
            disabled={isRunning}
            className="cyber-btn w-full"
          >
            {isRunning ? 'Running...' : `Run ${selectedDemo.name}`}
          </button>

          {/* Output */}
          {output && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 code-block"
            >
              <pre className="text-green-400 text-sm">
                {JSON.stringify(output, null, 2)}
              </pre>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
