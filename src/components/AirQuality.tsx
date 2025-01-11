import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

interface AirQualityProps {
  aqi: number;
  components: {
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
  };
}

export const AirQuality: React.FC<AirQualityProps> = ({ aqi, components }) => {
  const getAQILevel = (aqi: number) => {
    switch (aqi) {
      case 1:
        return { text: 'Good', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
      case 2:
        return { text: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
      case 3:
        return { text: 'Moderate', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
      case 4:
        return { text: 'Poor', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' };
      default:
        return { text: 'Very Poor', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' };
    }
  };

  const { text, color, bg, border } = getAQILevel(aqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg text-white"
    >
      <div className="flex items-center gap-2 mb-3">
        <Wind className="text-blue-400" />
        <h3 className="text-xl font-semibold">Air Quality</h3>
      </div>
      
      <div className={`${bg} rounded-lg p-2 mb-1 border ${border}`}>
        <p className={`text-2xl font-bold ${color}`}>{text}</p>
        <p className="text-sm text-gray-400">Air Quality Index: {aqi}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-lg">
          <p className="text-gray-400 lg:inline sm:block">PM2.5 - </p>
          <p className="text-white font-semibold lg:inline sm:mt-1">{components.pm2_5.toFixed(1)} µg/m³</p>
        </div>
        <div className="p-3 rounded-lg">
          <p className="text-gray-400 lg:inline sm:block">PM10 - </p>
          <p className="text-white font-semibold lg:inline sm:mt-1">{components.pm10.toFixed(1)} µg/m³</p>
        </div>
        <div className="p-3 rounded-lg">
          <p className="text-gray-400 lg:inline sm:block">O₃ - </p>
          <p className="text-white font-semibold lg:inline sm:mt-1">{components.o3.toFixed(1)} µg/m³</p>
        </div>
        <div className="p-3 rounded-lg">
          <p className="text-gray-400 lg:inline sm:block">NO₂ - </p>
          <p className="text-white font-semibold lg:inline sm:mt-1">{components.no2.toFixed(1)} µg/m³</p>
        </div>
      </div>
    </motion.div>
  );
};