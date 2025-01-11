import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { WeatherMap } from '../WeatherMap';
import { MapControls } from './MapControls';

interface MapViewProps {
  isOpen: boolean;
  onClose: () => void;
  coordinates?: { lat: number; lon: number };
}

export const MapView: React.FC<MapViewProps> = ({ isOpen, onClose, coordinates }) => {
  const [mapLayer, setMapLayer] = useState<'temp_new' | 'precipitation_new' | 'clouds_new' | 'pressure_new' | 'wind_new'>('temp_new');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm p-4 lg:p-8"
        >
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Weather Map</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden">
              <div className="mb-4">
                <MapControls mapLayer={mapLayer} setMapLayer={setMapLayer} />
              </div>
              <div className="h-[calc(100%-3rem)] rounded-xl overflow-hidden">
                <WeatherMap
                  lon={coordinates?.lon ?? 0}
                  lat={coordinates?.lat ?? 0}
                  layer={mapLayer}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};