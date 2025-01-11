import React from 'react';
import { Thermometer, Droplets, Cloud, Wind, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapLayerButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const MapLayerButton: React.FC<MapLayerButtonProps> = ({ active, onClick, icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 transition-all ${
      active 
        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
        : 'bg-zinc-800/80 text-gray-300 hover:bg-zinc-700/80'
    } backdrop-blur-sm lg:px-4 lg:py-2 p-3 rounded-xl`}
  >
    {icon}
    <span className="hidden lg:inline-block">{label}</span>
  </motion.button>
);

interface MapControlsProps {
  mapLayer: 'temp_new' | 'precipitation_new' | 'clouds_new' | 'pressure_new' | 'wind_new';
  setMapLayer: (layer: 'temp_new' | 'precipitation_new' | 'clouds_new' | 'pressure_new' | 'wind_new') => void;
}

export const MapControls: React.FC<MapControlsProps> = ({ mapLayer, setMapLayer }) => {
  const getLayerLabel = (layer: string) => {
    switch (layer) {
      case 'temp_new':
        return 'Temperature';
      case 'precipitation_new':
        return 'Precipitation';
      case 'clouds_new':
        return 'Clouds';
      case 'pressure_new':
        return 'Pressure';
      case 'wind_new':
        return 'Wind';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 lg:flex lg:flex-wrap gap-2">
        <MapLayerButton
          active={mapLayer === 'temp_new'}
          onClick={() => setMapLayer('temp_new')}
          icon={<Thermometer size={24} className={mapLayer === 'temp_new' ? 'text-white' : 'text-yellow-400'} />}
          label="Temperature"
        />
        <MapLayerButton
          active={mapLayer === 'precipitation_new'}
          onClick={() => setMapLayer('precipitation_new')}
          icon={<Droplets size={24} className={mapLayer === 'precipitation_new' ? 'text-white' : 'text-blue-400'} />}
          label="Precipitation"
        />
        <MapLayerButton
          active={mapLayer === 'clouds_new'}
          onClick={() => setMapLayer('clouds_new')}
          icon={<Cloud size={24} className={mapLayer === 'clouds_new' ? 'text-white' : 'text-gray-400'} />}
          label="Clouds"
        />
        <MapLayerButton
          active={mapLayer === 'pressure_new'}
          onClick={() => setMapLayer('pressure_new')}
          icon={<Gauge size={24} className={mapLayer === 'pressure_new' ? 'text-white' : 'text-purple-400'} />}
          label="Pressure"
        />
        <MapLayerButton
          active={mapLayer === 'wind_new'}
          onClick={() => setMapLayer('wind_new')}
          icon={<Wind size={24} className={mapLayer === 'wind_new' ? 'text-white' : 'text-green-400'} />}
          label="Wind"
        />
      </div>
      
      {/* Selected layer label - Only visible on mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mapLayer}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="lg:hidden text-center text-white/90 font-medium"
        >
          {getLayerLabel(mapLayer)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};