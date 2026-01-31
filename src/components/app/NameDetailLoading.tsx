import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';

type Props = {
  name: string;
};

export function NameDetailLoading({ name }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      {/* Animated Icon */}
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full mb-5"
      >
        <Sparkles className="w-8 h-8 text-slate-700" />
      </motion.div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Checking availability
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 mb-6">
        Finding the best domains and social handles for{" "}
        <span className="font-medium text-gray-900">{name}</span>
      </p>

      {/* Steps */}
      <div className="space-y-3 w-full max-w-xs">
        {[
          { label: 'Checking domain options', delay: 0 },
          { label: 'Verifying social handles', delay: 0.2 },
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay }}
            className="flex items-center space-x-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Loader2 className="w-4 h-4 text-slate-600" />
            </motion.div>
            <span className="text-sm text-gray-700">{step.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full max-w-xs">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-slate-600 to-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
