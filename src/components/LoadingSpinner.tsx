import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Floating clouds */}
        <motion.div
          className="absolute -left-20 -top-16"
          animate={{
            x: [0, 10, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Cloud className="w-12 h-12 text-white/50" />
        </motion.div>

        <motion.div
          className="absolute -right-16 -top-20"
          animate={{
            x: [0, -10, 0],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Cloud className="w-8 h-8 text-white/30" />
        </motion.div>

        {/* Sun */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Sun className="w-16 h-16 text-yellow-400" />
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="absolute top-16 left-1/2 -translate-x-1/2 text-yellow-300 font-medium"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        >
          Loading Weather Data...
        </motion.div>
      </div>
    </div>
  );
};