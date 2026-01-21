'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Module {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Props {
  modules: Module[];
}

// Module positions in the diagram
const POSITIONS: { [key: string]: { x: number; y: number; layer: string } } = {
  router: { x: 400, y: 80, layer: 'input' },
  guard: { x: 200, y: 80, layer: 'input' },
  promptgen: { x: 600, y: 80, layer: 'input' },
  qstar: { x: 150, y: 200, layer: 'process' },
  reasoning: { x: 400, y: 200, layer: 'process' },
  agents: { x: 650, y: 200, layer: 'process' },
  memory: { x: 150, y: 320, layer: 'storage' },
  graphrag: { x: 400, y: 320, layer: 'storage' },
  lora: { x: 650, y: 320, layer: 'storage' },
  viz: { x: 275, y: 440, layer: 'output' },
  autogen: { x: 525, y: 440, layer: 'output' },
  hypertune: { x: 400, y: 520, layer: 'output' },
};

// Connections between modules
const CONNECTIONS = [
  { from: 'guard', to: 'router', label: 'validated' },
  { from: 'router', to: 'reasoning', label: 'route' },
  { from: 'router', to: 'agents', label: 'dispatch' },
  { from: 'promptgen', to: 'agents', label: 'prompts' },
  { from: 'reasoning', to: 'qstar', label: 'decide' },
  { from: 'reasoning', to: 'memory', label: 'store' },
  { from: 'agents', to: 'graphrag', label: 'extract' },
  { from: 'agents', to: 'lora', label: 'fine-tune' },
  { from: 'memory', to: 'viz', label: 'visualize' },
  { from: 'graphrag', to: 'viz', label: 'graph' },
  { from: 'graphrag', to: 'autogen', label: 'context' },
  { from: 'qstar', to: 'autogen', label: 'policy' },
  { from: 'viz', to: 'hypertune', label: 'metrics' },
  { from: 'autogen', to: 'hypertune', label: 'optimize' },
];

export default function ArchitectureDiagram({ modules }: Props) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<number | null>(null);

  const getModuleData = (id: string) => modules.find(m => m.id === id);

  return (
    <div className="cyber-card p-8 overflow-x-auto">
      <svg viewBox="0 0 800 600" className="w-full h-auto min-w-[600px]">
        <defs>
          {/* Gradient definitions for each module */}
          {modules.map(m => (
            <linearGradient key={m.id} id={`grad-${m.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={m.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={m.color} stopOpacity="0.1" />
            </linearGradient>
          ))}

          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" opacity="0.6" />
          </marker>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer labels */}
        <text x="50" y="90" fill="#666" fontSize="12" fontFamily="monospace">INPUT</text>
        <text x="50" y="210" fill="#666" fontSize="12" fontFamily="monospace">PROCESS</text>
        <text x="50" y="330" fill="#666" fontSize="12" fontFamily="monospace">STORAGE</text>
        <text x="50" y="450" fill="#666" fontSize="12" fontFamily="monospace">OUTPUT</text>

        {/* Layer dividers */}
        {[150, 270, 390].map((y, i) => (
          <line
            key={i}
            x1="100"
            y1={y}
            x2="750"
            y2={y}
            stroke="#333"
            strokeDasharray="5,5"
            opacity="0.3"
          />
        ))}

        {/* Connections */}
        {CONNECTIONS.map((conn, i) => {
          const fromPos = POSITIONS[conn.from];
          const toPos = POSITIONS[conn.to];
          if (!fromPos || !toPos) return null;

          const isHighlighted =
            hoveredModule === conn.from ||
            hoveredModule === conn.to ||
            hoveredConnection === i;

          // Calculate control points for curved lines
          const midX = (fromPos.x + toPos.x) / 2;
          const midY = (fromPos.y + toPos.y) / 2;
          const dx = toPos.x - fromPos.x;
          const dy = toPos.y - fromPos.y;
          const curve = Math.min(Math.abs(dx), Math.abs(dy)) * 0.3;

          return (
            <g key={i}>
              <motion.path
                d={`M ${fromPos.x} ${fromPos.y + 30}
                    Q ${midX} ${midY + curve} ${toPos.x} ${toPos.y - 30}`}
                fill="none"
                stroke={isHighlighted ? '#8b5cf6' : '#444'}
                strokeWidth={isHighlighted ? 2 : 1}
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={isHighlighted ? 'data-flow-path' : ''}
                onMouseEnter={() => setHoveredConnection(i)}
                onMouseLeave={() => setHoveredConnection(null)}
                style={{ cursor: 'pointer' }}
              />
              {isHighlighted && (
                <text
                  x={midX}
                  y={midY}
                  fill="#8b5cf6"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {conn.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Module nodes */}
        {Object.entries(POSITIONS).map(([id, pos]) => {
          const moduleData = getModuleData(id);
          if (!moduleData) return null;

          const isHovered = hoveredModule === id;

          return (
            <motion.g
              key={id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + Math.random() * 0.3 }}
              onMouseEnter={() => setHoveredModule(id)}
              onMouseLeave={() => setHoveredModule(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer glow */}
              {isHovered && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="45"
                  fill={moduleData.color}
                  opacity="0.2"
                  filter="url(#glow)"
                />
              )}

              {/* Main circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="35"
                fill={`url(#grad-${id})`}
                stroke={isHovered ? moduleData.color : '#444'}
                strokeWidth={isHovered ? 2 : 1}
              />

              {/* Icon */}
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="20"
              >
                {moduleData.icon}
              </text>

              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + 50}
                textAnchor="middle"
                fill={isHovered ? '#fff' : '#888'}
                fontSize="11"
                fontWeight={isHovered ? 'bold' : 'normal'}
              >
                {moduleData.name}
              </text>
            </motion.g>
          );
        })}

        {/* Central MCP Hub */}
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
          <rect
            x="350"
            y="565"
            width="100"
            height="30"
            rx="5"
            fill="#8b5cf620"
            stroke="#8b5cf6"
            strokeWidth="2"
          />
          <text
            x="400"
            y="585"
            textAnchor="middle"
            fill="#8b5cf6"
            fontSize="12"
            fontWeight="bold"
          >
            MCP Server
          </text>
        </motion.g>
      </svg>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
        {['input', 'process', 'storage', 'output'].map(layer => (
          <div key={layer} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500/30" />
            <span className="text-gray-400 capitalize">{layer} Layer</span>
          </div>
        ))}
      </div>
    </div>
  );
}
