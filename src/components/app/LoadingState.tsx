import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12">
      <div className="max-w-lg mx-auto text-center">
        {/* Animated Icon */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full mb-6"
        >
          <Sparkles className="w-10 h-10 text-slate-700" />
        </motion.div>

        {/* Loading Text */}
        <h2 className="text-2xl mb-3 text-gray-900">
          Generating Your Brand Names...
        </h2>
        <p className="text-gray-600 mb-8">
          Our AI is crafting unique, memorable names and checking domain availability across the web.
        </p>

        {/* Loading Steps */}
        <div className="space-y-4 max-w-md mx-auto">
          {[
            { label: 'Analyzing your prompt', delay: 0 },
            { label: 'Generating creative names', delay: 0.2 },
            { label: 'Checking domain availability', delay: 0.4 },
            { label: 'Verifying social handles', delay: 0.6 },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay }}
              className="flex items-center space-x-3 text-left"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="w-5 h-5 text-slate-600" />
              </motion.div>
              <span className="text-gray-700">{step.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-full max-w-sm mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-slate-600 to-slate-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
