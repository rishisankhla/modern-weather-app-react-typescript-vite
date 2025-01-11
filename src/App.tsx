import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar/index';
import { Header } from './components/Layout/Header';
import { WeatherDashboard } from './components/Weather/WeatherDashboard';
import { MapView } from './components/Weather/MapView';
import { useWeatherData } from './hooks/useWeatherData';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const {
    weather,
    forecast,
    airQuality,
    uvIndex,
    error,
    loading,
    handleSearch,
    handleLogout
  } = useWeatherData();

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsSidebarOpen(isDesktop);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWeatherSearch = (city: string) => {
    handleSearch(city);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleExplore = () => {
    setIsMapOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <Sidebar 
          onSearch={handleWeatherSearch}
          onLogout={handleLogout}
          isOpen={isSidebarOpen}
          onClose={() => {
            if (window.innerWidth < 1024) {
              setIsSidebarOpen(false);
            }
          }}
        />
        <div className="lg:pl-20">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col items-center space-y-8">
              {loading && <LoadingSpinner />}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500"
                >
                  {error}
                </motion.div>
              )}

              {weather && (
                <WeatherDashboard 
                  weather={weather}
                  forecast={forecast}
                  airQuality={airQuality}
                  uvIndex={uvIndex}
                  onExplore={handleExplore}
                />
              )}

              {!weather && !loading && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[var(--text-secondary)]"
                >
                  <p className="text-xl">Click the search icon to find a city</p>
                  <p className="text-sm mt-2">Example: London, Tokyo, New York</p>
                </motion.div>
              )}
            </div>
          </main>
        </div>

        <MapView
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
          coordinates={weather?.coord}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;