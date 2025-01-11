import React from 'react';
import { motion } from 'framer-motion';

interface ExploreCardProps {
  onExplore: () => void;
}

export const ExploreCard: React.FC<ExploreCardProps> = ({ onExplore }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[300px] rounded-xl overflow-hidden group cursor-pointer"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1470219556762-1771e7f9427d?q=80&w=2069&auto=format&fit=crop")'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col items-center text-center">
        <h2 className="text-xl font-semibold text-white mb-auto max-w-[80%]">
          Explore global map of wind, weather and ocean condition.
        </h2>
        
        <div className="flex justify-center">
          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full 
                     border border-white/20 hover:bg-white/20 transition-colors
                     flex items-center gap-2 group"
          >
            Get Started
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: 3 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};