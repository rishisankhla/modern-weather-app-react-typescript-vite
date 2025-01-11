import React from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => (
  <nav className="bg-black">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between px-4 py-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="text-white" size={24} />
          </button>
          <CloudSun className="text-blue-400" size={32} />
          <span className="text-xl font-bold text-white">WeatherApp</span>
        </motion.div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4">
      <div className="border-b border-white/20" />
    </div>
  </nav>
);