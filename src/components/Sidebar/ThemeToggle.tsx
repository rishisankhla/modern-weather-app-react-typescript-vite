import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full bg-black/20 p-1 cursor-pointer border border-orange-500/30"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-5 h-5 rounded-full flex items-center justify-center"
        initial={false}
        animate={{
          x: isDark ? '26px' : '0px',
          backgroundColor: isDark ? '#1a1a1a' : '#fbbf24'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-gray-200" />
        ) : (
          <Sun className="w-3 h-3 text-gray-800" />
        )}
      </motion.div>
    </motion.button>
  );
};