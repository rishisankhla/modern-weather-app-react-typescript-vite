import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

interface VisibilityProps {
  visibility: number; // visibility in meters
}

export const Visibility: React.FC<VisibilityProps> = ({ visibility }) => {
  // Convert meters to kilometers
  const visibilityKm = (visibility / 1000).toFixed(1);
  
  const getVisibilityStatus = (visibility: number) => {
    if (visibility >= 10000) return { text: 'Clear', color: '#22c55e' };
    if (visibility >= 5000) return { text: 'Good', color: '#eab308' };
    if (visibility >= 2000) return { text: 'Moderate', color: '#f97316' };
    return { text: 'Poor', color: '#ef4444' };
  };

  const { text, color } = getVisibilityStatus(visibility);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg text-white"
    >
      <div className="flex items-center gap-2 mb-6">
        <Eye className="text-blue-400" />
        <h3 className="text-xl font-semibold">Visibility</h3>
      </div>

      <div className="text-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-5xl font-bold mb-2"
          style={{ color }}
        >
          {visibilityKm}
        </motion.div>
        <div className="text-gray-400">km</div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-black/20 rounded-lg p-4 text-center"
      >
        <p className="text-lg" style={{ color }}>
          {text}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {getVisibilityMessage(visibility)}
        </p>
      </motion.div>
    </motion.div>
  );
};

function getVisibilityMessage(visibility: number): string {
  if (visibility < 1000) {
    return 'Heavy haze';
  } else if (visibility < 2000) {
    return 'Hazy';
  } else if (visibility < 5000) {
    return 'Slight haze';
  } else {
    return 'Clear';
  }
}

