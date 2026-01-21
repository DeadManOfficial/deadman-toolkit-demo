'use client';

import { motion } from 'framer-motion';
import { SOCIAL_LINKS, CREATOR_INFO } from '@/lib/social-config';

// SVG Icons
const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface SocialLinksProps {
  variant?: 'footer' | 'floating' | 'inline';
  showCTA?: boolean;
}

export default function SocialLinks({ variant = 'footer', showCTA = true }: SocialLinksProps) {
  const links = [
    { key: 'x', icon: XIcon, color: '#000000', hoverColor: '#1da1f2', ...SOCIAL_LINKS.x },
    { key: 'tiktok', icon: TikTokIcon, color: '#000000', hoverColor: '#ff0050', ...SOCIAL_LINKS.tiktok },
    { key: 'youtube', icon: YouTubeIcon, color: '#ff0000', hoverColor: '#ff0000', ...SOCIAL_LINKS.youtube },
    { key: 'github', icon: GitHubIcon, color: '#ffffff', hoverColor: '#8b5cf6', ...SOCIAL_LINKS.github },
  ];

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {links.map((link, i) => (
          <motion.a
            key={link.key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all group"
            title={link.cta}
          >
            <link.icon />
          </motion.a>
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/10 transition-all text-gray-400 hover:text-white"
            title={link.cta}
          >
            <link.icon />
          </a>
        ))}
      </div>
    );
  }

  // Footer variant (default)
  return (
    <section className="py-16 px-4 border-t border-purple-500/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Creator info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-2">
            Created by{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {CREATOR_INFO.name}
            </span>
          </h3>
          <p className="text-gray-400">{CREATOR_INFO.tagline}</p>
        </motion.div>

        {/* Social links with CTAs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {links.map((link, i) => (
            <motion.a
              key={link.key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all">
                  <link.icon />
                </div>
                <div>
                  <div className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {link.handle}
                  </div>
                  {showCTA && (
                    <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors mt-1">
                      {link.cta}
                    </div>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Call to action */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-gray-400 text-sm"
        >
          Join the community and stay updated on{' '}
          <span className="text-purple-400 font-semibold">FREE AI tools</span>
        </motion.p>
      </div>
    </section>
  );
}
