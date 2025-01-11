import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationButtons } from './NavigationButtons';
import { SettingsButtons } from './SettingsButtons';
import { SearchPanel } from './SearchPanel';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  onSearch: (city: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

type ActiveItem = 'dashboard' | 'search' | null;

export const Sidebar: React.FC<SidebarProps> = ({ 
  onSearch, 
  onLogout,
  isOpen,
  onClose
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeItem, setActiveItem] = useState<ActiveItem>('dashboard');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const updateSearchHistory = (city: string) => {
    const newHistory = [city, ...searchHistory.filter(item => item !== city)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      updateSearchHistory(query.trim());
      setQuery('');
      setIsSearchOpen(false);
      setActiveItem('dashboard');
      onClose();
    }
  };

  const handleHistoryItemClick = (city: string) => {
    onSearch(city);
    updateSearchHistory(city);
    setIsSearchOpen(false);
    setActiveItem('dashboard');
    onClose();
  };

  const handleItemClick = (item: ActiveItem) => {
    if (item === 'search') {
      setIsSearchOpen(true);
      setActiveItem('search');
      if (window.innerWidth < 1024) {
        onClose();
      }
    } else {
      setActiveItem(item);
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    setActiveItem('dashboard');
    setIsSearchOpen(false);
    setSearchHistory([]);
    onLogout();
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence mode="wait">
        {isOpen && !isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {((isOpen || window.innerWidth >= 1024) && !isSearchOpen) && (
          <motion.div 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`fixed left-2 top-2 h-[calc(100vh-1rem)] w-16 bg-zinc-800/50 backdrop-blur-sm 
                     text-[var(--text-primary)] flex flex-col py-8 z-20
                     rounded-2xl mr-6 lg:left-2 shadow-lg`}
          >
            <div className="flex flex-col items-center flex-1">
              <NavigationButtons
                activeItem={activeItem}
                onItemClick={handleItemClick}
              />
              
              <div className="flex-1" />
              
              <SettingsButtons 
                onLogout={handleLogout}
                isDark={theme === 'dark'}
                onThemeToggle={toggleTheme}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Panel */}
      <AnimatePresence mode="wait">
        {isSearchOpen && (
          <SearchPanel
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSubmit}
            onClose={() => {
              setIsSearchOpen(false);
              setActiveItem('dashboard');
              onClose();
            }}
            searchHistory={searchHistory}
            onHistoryItemClick={handleHistoryItemClick}
          />
        )}
      </AnimatePresence>
    </>
  );
};