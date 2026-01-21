'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Tool {
  name: string;
  module: string;
  description: string;
  color: string;
}

const ALL_TOOLS: Tool[] = [
  // Model Router (4)
  { name: 'route_request', module: 'Model Router', description: 'Route request to optimal provider', color: '#f97316' },
  { name: 'list_providers', module: 'Model Router', description: 'List available LLM providers', color: '#f97316' },
  { name: 'check_provider', module: 'Model Router', description: 'Check provider availability', color: '#f97316' },
  { name: 'set_preference', module: 'Model Router', description: 'Set routing preferences', color: '#f97316' },

  // Content Guard (3)
  { name: 'guard_validate', module: 'Content Guard', description: 'Validate content safety', color: '#ef4444' },
  { name: 'guard_analyze', module: 'Content Guard', description: 'Analyze for PII/toxicity', color: '#ef4444' },
  { name: 'guard_rules', module: 'Content Guard', description: 'Manage custom rules', color: '#ef4444' },

  // Q-Star (4)
  { name: 'qstar_decide', module: 'Q-Star', description: 'Get Q-learning decision', color: '#8b5cf6' },
  { name: 'qstar_train', module: 'Q-Star', description: 'Train on experience', color: '#8b5cf6' },
  { name: 'qstar_policy', module: 'Q-Star', description: 'Get current policy', color: '#8b5cf6' },
  { name: 'qstar_stats', module: 'Q-Star', description: 'Get training statistics', color: '#8b5cf6' },

  // GraphRAG (3)
  { name: 'graphrag_extract', module: 'GraphRAG', description: 'Extract entities & relations', color: '#06b6d4' },
  { name: 'graphrag_query', module: 'GraphRAG', description: 'Query knowledge graph', color: '#06b6d4' },
  { name: 'graphrag_stats', module: 'GraphRAG', description: 'Get graph statistics', color: '#06b6d4' },

  // SAFLA Memory (5)
  { name: 'memory_store', module: 'SAFLA Memory', description: 'Store in memory layer', color: '#10b981' },
  { name: 'memory_retrieve', module: 'SAFLA Memory', description: 'Retrieve from memory', color: '#10b981' },
  { name: 'memory_learn', module: 'SAFLA Memory', description: 'Learn from experience', color: '#10b981' },
  { name: 'memory_consolidate', module: 'SAFLA Memory', description: 'Consolidate memories', color: '#10b981' },
  { name: 'memory_stats', module: 'SAFLA Memory', description: 'Get memory statistics', color: '#10b981' },

  // Reasoning Engine (4)
  { name: 'reason_analyze', module: 'Reasoning Engine', description: 'Quick cognitive analysis', color: '#ec4899' },
  { name: 'reason_full', module: 'Reasoning Engine', description: 'Full 13-block pipeline', color: '#ec4899' },
  { name: 'reason_scratchpad', module: 'Reasoning Engine', description: 'Generate scratchpad', color: '#ec4899' },
  { name: 'reason_blocks', module: 'Reasoning Engine', description: 'List reasoning blocks', color: '#ec4899' },

  // Unified Agents (5)
  { name: 'agent_review', module: 'Unified Agents', description: 'Code review agent', color: '#3b82f6' },
  { name: 'agent_research', module: 'Unified Agents', description: 'Research agent', color: '#3b82f6' },
  { name: 'agent_plan', module: 'Unified Agents', description: 'Planning agent', color: '#3b82f6' },
  { name: 'agent_debug', module: 'Unified Agents', description: 'Debugging agent', color: '#3b82f6' },
  { name: 'agent_list', module: 'Unified Agents', description: 'List all agents', color: '#3b82f6' },

  // LoRA Fine-Tuner (4)
  { name: 'lora_config', module: 'LoRA Fine-Tuner', description: 'Generate LoRA config', color: '#f59e0b' },
  { name: 'lora_prepare', module: 'LoRA Fine-Tuner', description: 'Prepare training data', color: '#f59e0b' },
  { name: 'lora_script', module: 'LoRA Fine-Tuner', description: 'Generate training script', color: '#f59e0b' },
  { name: 'lora_presets', module: 'LoRA Fine-Tuner', description: 'List preset configs', color: '#f59e0b' },

  // AutoGen (4)
  { name: 'autogen_create', module: 'AutoGen', description: 'Create conversation agent', color: '#a855f7' },
  { name: 'autogen_chat', module: 'AutoGen', description: 'Run multi-agent chat', color: '#a855f7' },
  { name: 'autogen_patterns', module: 'AutoGen', description: 'List chat patterns', color: '#a855f7' },
  { name: 'autogen_roles', module: 'AutoGen', description: 'List agent roles', color: '#a855f7' },

  // Graph Visualization (3)
  { name: 'viz_create', module: 'Graph Viz', description: 'Create semantic graph', color: '#14b8a6' },
  { name: 'viz_from_graphrag', module: 'Graph Viz', description: 'Visualize GraphRAG output', color: '#14b8a6' },
  { name: 'viz_render', module: 'Graph Viz', description: 'Render to HTML', color: '#14b8a6' },

  // HyperTune (3)
  { name: 'tune_score', module: 'HyperTune', description: 'Score response quality', color: '#eab308' },
  { name: 'tune_optimize', module: 'HyperTune', description: 'Optimize parameters', color: '#eab308' },
  { name: 'tune_metrics', module: 'HyperTune', description: 'Get quality metrics', color: '#eab308' },

  // Prompt Generator (3)
  { name: 'prompt_generate', module: 'Prompt Gen', description: 'Generate AI persona', color: '#22c55e' },
  { name: 'prompt_templates', module: 'Prompt Gen', description: 'List templates', color: '#22c55e' },
  { name: 'prompt_system', module: 'Prompt Gen', description: 'Generate system prompt', color: '#22c55e' },

  // Reasoning Tasks (3)
  { name: 'task_generate', module: 'Reasoning Tasks', description: 'Generate training task', color: '#f472b6' },
  { name: 'task_evaluate', module: 'Reasoning Tasks', description: 'Evaluate solution', color: '#f472b6' },
  { name: 'task_stats', module: 'Reasoning Tasks', description: 'Get task statistics', color: '#f472b6' },

  // Toolkit Status (2)
  { name: 'toolkit_status', module: 'System', description: 'Get toolkit status', color: '#64748b' },
  { name: 'toolkit_help', module: 'System', description: 'Get help documentation', color: '#64748b' },
];

export default function ToolsGrid() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const modules = [...new Set(ALL_TOOLS.map(t => t.module))];

  const filteredTools = ALL_TOOLS.filter(tool => {
    const matchesModule = filter === 'all' || tool.module === filter;
    const matchesSearch = search === '' ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    return matchesModule && matchesSearch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="cyber-input max-w-xs"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              filter === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
            }`}
          >
            All ({ALL_TOOLS.length})
          </button>
          {modules.map(module => {
            const count = ALL_TOOLS.filter(t => t.module === module).length;
            return (
              <button
                key={module}
                onClick={() => setFilter(module)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  filter === module
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                }`}
              >
                {module} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <code className="text-sm font-mono text-purple-400 group-hover:text-purple-300">
                {tool.name}
              </code>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tool.color }}
              />
            </div>
            <p className="text-xs text-gray-400 mb-2">{tool.description}</p>
            <span
              className="text-xs px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${tool.color}20`,
                color: tool.color
              }}
            >
              {tool.module}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No tools match your search
        </div>
      )}

      {/* Stats */}
      <div className="mt-8 text-center text-gray-400">
        Showing {filteredTools.length} of {ALL_TOOLS.length} tools
      </div>
    </div>
  );
}
