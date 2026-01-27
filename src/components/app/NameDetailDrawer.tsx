import React from 'react';
import { X, Check, ExternalLink, Copy, Crown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { NameResult } from '../../App';

type NameDetailDrawerProps = {
  name: NameResult | null;
  open: boolean;
  onClose: () => void;
};

export function NameDetailDrawer({ name, open, onClose }: NameDetailDrawerProps) {
  if (!name) return null;

  const socialPlatforms = [
    { key: 'instagram', label: 'Instagram', url: 'instagram.com' },
    { key: 'twitter', label: 'X (Twitter)', url: 'x.com' },
    { key: 'linkedin', label: 'LinkedIn', url: 'linkedin.com' },
    { key: 'tiktok', label: 'TikTok', url: 'tiktok.com' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">{name.name}</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Brandability Score */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-slate-700" />
                    <span className="text-sm font-medium text-gray-700">Brandability Score</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{name.brandability}</span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-slate-600 to-slate-900"
                    style={{ width: `${name.brandability}%` }}
                  />
                </div>
              </div>

              {/* Explanation */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Why this name?</h3>
                <p className="text-gray-600 leading-relaxed">{name.explanation}</p>
              </div>

              {/* Available Domains */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Domains</h3>
                <div className="space-y-2">
                  {Object.entries(name.domains).map(([ext, available]) => (
                    <div
                      key={ext}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        available
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            available ? 'bg-green-100' : 'bg-gray-100'
                          }`}
                        >
                          {available ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">
                          {name.name}.{ext}
                        </span>
                      </div>
                      {available && (
                        <button className="flex items-center space-x-1 text-sm text-slate-700 hover:text-slate-900">
                          <ExternalLink className="w-4 h-4" />
                          <span>Check</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media Handles */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Social Media Handles</h3>
                <div className="space-y-2">
                  {socialPlatforms.map((platform) => {
                    const available = name.socials[platform.key as keyof typeof name.socials];
                    return (
                      <div
                        key={platform.key}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          available
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              available ? 'bg-green-100' : 'bg-gray-100'
                            }`}
                          >
                            {available ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <X className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{platform.label}</p>
                            <p className="text-sm text-gray-500">@{name.name.toLowerCase()}</p>
                          </div>
                        </div>
                        {available && (
                          <button className="flex items-center space-x-1 text-sm text-slate-700 hover:text-slate-900">
                            <ExternalLink className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Logo Recommendation */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Recommended Logo Style
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  A modern, minimalist logo with bold typography would work well. Consider using a
                  geometric icon or lettermark with the first letter "{name.name.charAt(0)}".
                </p>
                <div className="flex gap-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    {name.name.charAt(0)}
                  </div>
                  <div className="w-16 h-16 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center text-slate-900 text-2xl font-bold">
                    {name.name.charAt(0)}
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    {name.name.charAt(0)}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-4">
                <button className="w-full py-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>Reserve Domain with Pro</span>
                </button>
                <button className="w-full py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg hover:border-slate-300 transition-all flex items-center justify-center space-x-2">
                  <Copy className="w-5 h-5" />
                  <span>Copy Name</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
