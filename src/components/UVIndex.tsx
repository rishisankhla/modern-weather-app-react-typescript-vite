import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

interface UVIndexProps {
  value: number;
}

export const UVIndex: React.FC<UVIndexProps> = ({ value }) => {
  const getUVLevel = (value: number) => {
    if (value <= 2) return { color: '#22c55e' };
    if (value <= 5) return { color: '#eab308' };
    if (value <= 7) return { color: '#f97316' };
    if (value <= 10) return { color: '#ef4444' };
    return { color: '#7c3aed' };
  };

  const { color } = getUVLevel(value);

  // Show numbers greater than the current UV value
  const visibleNumbers = [0, 2, 4, 6, 8, 10, 12].filter(num => num > Math.ceil(value));

  // Calculate end points using the provided formula
  // endX = (((-cos(v/12 * π) + 1) / 2) * 120) + 40
  // endY = (-sin(v/12 * π) * 55) + 100
  const endX = (((-Math.cos((value/12) * Math.PI) + 1) / 2) * 120) + 40;
  const endY = (-Math.sin((value/12) * Math.PI) * 55) + 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg text-white"
    >
      <div className="flex items-center gap-2 mb-2">
        <Sun className="text-yellow-500" />
        <h3 className="text-xl font-semibold">UV Index</h3>
      </div>

      <div className="flex justify-center mb-9">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="relative w-full h-32"
        >
          <svg viewBox="0 0 200 120" className="w-full">
            {/* Background Arc */}
            <path
              d="M20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#1f1f1f"
              strokeWidth="6"
              strokeLinecap="butt"
            />
            {/* Value Arc */}
            <motion.path
              d="M20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={color}
              strokeWidth="18"
              strokeLinecap="butt"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: value / 12 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
            {/* Show remaining numbers */}
            {visibleNumbers.map((tick) => {
              const angle = (tick / 12) * Math.PI;
              const x = 100 - 70 * Math.cos(angle);
              const y = 100 - 70 * Math.sin(angle);
              return (
                <motion.text
                  key={tick}
                  x={x}
                  y={y}
                  fill="#666"
                  fontSize="8"
                  textAnchor="middle"
                  className="font-medium"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                >
                  {tick}
                </motion.text>
              );
            })}
            {/* UV Index Arrow */}
            <g>
              {/* Fixed pivot point */}
              <circle
                cx="100"
                cy="100"
                r="3"
                fill={color}
              />
              {/* Line from pivot to end point */}
              <motion.line
                x1="100"
                y1="100"
                initial={{ x2: 40, y2: 100 }}
                animate={{ x2: endX, y2: endY }}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </g>
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <p className="text-lg font-semibold text-white">
          {value.toFixed(2)} UV
        </p>
      </motion.div>
    </motion.div>
  );
};