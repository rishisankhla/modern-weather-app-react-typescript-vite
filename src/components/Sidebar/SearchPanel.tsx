import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, Clock } from 'lucide-react';

interface SearchPanelProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  searchHistory: string[];
  onHistoryItemClick: (city: string) => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  query,
  onQueryChange,
  onSubmit,
  onClose,
  searchHistory,
  onHistoryItemClick
}) => (
  <>
    {/* Mobile overlay for search panel */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10"
      onClick={onClose}
    />
    
    <motion.div
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      className="fixed left-0 top-0 h-screen w-full sm:w-80 bg-zinc-900/50 backdrop-blur-sm border-r border-white/5 p-6 z-20"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">Search Location</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 pl-10 text-white bg-black/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
        />
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </form>

      <div className="mt-6">
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <Clock size={16} />
          <span>Recent Searches</span>
        </div>
        {searchHistory.length > 0 ? (
          searchHistory.map((city) => (
            <button
              key={city}
              onClick={() => onHistoryItemClick(city)}
              className="w-full text-left px-4 py-3 text-white hover:bg-black/20 rounded-lg mb-2 transition-colors flex items-center gap-3"
            >
              <Clock size={16} className="text-gray-400" />
              {city}
            </button>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center mt-4">
            No recent searches
          </p>
        )}
      </div>
    </motion.div>
  </>
);