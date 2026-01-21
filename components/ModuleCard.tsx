'use client';

import { motion } from 'framer-motion';

interface ModuleProps {
  module: {
    id: string;
    name: string;
    icon: string;
    color: string;
    tools: number;
    description: string;
    features: string[];
  };
  index: number;
  onClick: () => void;
}

export default function ModuleCard({ module, index, onClick }: ModuleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="cyber-card p-6 cursor-pointer group"
      style={{
        borderColor: `${module.color}30`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl group-hover:scale-110 transition-transform">
          {module.icon}
        </span>
        <span
          className="text-xs px-2 py-1 rounded-full font-mono"
          style={{
            backgroundColor: `${module.color}20`,
            color: module.color
          }}
        >
          {module.tools} tools
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
        {module.name}
      </h3>

      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {module.description}
      </p>

      <div className="flex flex-wrap gap-1">
        {module.features.slice(0, 3).map((feature, i) => (
          <span
            key={i}
            className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-500"
          >
            {feature}
          </span>
        ))}
        {module.features.length > 3 && (
          <span className="text-xs text-gray-600">
            +{module.features.length - 3} more
          </span>
        )}
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          boxShadow: `0 0 40px ${module.color}20`,
        }}
      />
    </motion.div>
  );
}
