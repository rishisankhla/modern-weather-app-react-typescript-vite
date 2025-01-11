import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { 
  WiDaySunny, 
  WiCloudy, 
  WiDayCloudy, 
  WiRain, 
  WiThunderstorm,
  WiSnow,
  WiFog 
} from 'react-icons/wi';
import { ForecastData } from '../../types/weather';

interface ForecastSectionProps {
  forecast: ForecastData;
}

export const ForecastSection: React.FC<ForecastSectionProps> = ({ forecast }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Get the current week's Monday through Sunday
  const monday = new Date(currentDate);
  monday.setDate(currentDate.getDate() - currentDate.getDay() + 1);
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });

  // Match forecast data with weekdays
  const weekForecast = weekDays.map(date => {
    const dateStr = date.toISOString().split('T')[0];
    return {
      date,
      forecast: forecast.list.find(item => 
        item.dt_txt.split(' ')[0] === dateStr
      ) || forecast.list[0]
    };
  });

  // Handle scroll position
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const isAtStart = container.scrollLeft === 0;
      setShowScrollIndicator(isAtStart);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="w-full bg-black text-white rounded-xl pt-5 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{month} {year}</h2>
          <p className="text-sm text-gray-400">
            {currentDate.toLocaleDateString('default', { weekday: 'long' })}, {currentDate.getDate()} {month}
          </p>
        </div>
      </div>

      {/* Container with mobile-only scroll */}
      <div className="relative">
        {/* Mobile scroll indicators - only visible on mobile */}
        <div className="lg:hidden">
          <AnimatePresence>
            {showScrollIndicator && (
              <>
                {/* Gradient fade - reduced width from w-24 to w-16 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10"
                />
                
                {/* Scroll arrow indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
        {/* Mobile: Horizontal scroll container, Desktop: Grid */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-7 gap-3 pb-4 lg:pb-0 scrollbar-hide"
        >
          {weekForecast.map(({ date, forecast }) => {
            const isCurrentDay = date.toDateString() === currentDate.toDateString();
            return (
              <motion.div 
                key={date.toISOString()} 
                className={`relative flex-shrink-0 w-[140px] lg:w-auto bg-zinc-900 rounded-xl p-4 ${
                  isCurrentDay ? 'ring-2 ring-blue-500 ring-inset' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Day and Date */}
                <div className="text-center mb-4">
                  <p className="text-gray-400 font-medium whitespace-nowrap text-base">
                    {date.toLocaleDateString('default', { weekday: 'short' })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {date.getDate()}
                  </p>
                </div>

                {/* Weather Icon */}
                <WeatherIcon type={forecast.weather[0].main} />

                {/* Temperature */}
                <div className="text-center mt-4">
                  <p className="text-xl font-semibold">{Math.round(forecast.main.temp)}°</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WeatherIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconProps = {
    size: 48,
    className: "text-white mx-auto"
  };

  const getWeatherIcon = () => {
    switch (type.toLowerCase()) {
      case 'clear':
        return (
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex justify-center"
          >
            <WiDaySunny {...iconProps} className="text-yellow-400" />
          </motion.div>
        );
      case 'clouds':
        return (
          <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center"
          >
            <WiCloudy {...iconProps} className="text-gray-400" />
          </motion.div>
        );
      case 'rain':
        return (
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center"
          >
            <WiRain {...iconProps} className="text-blue-400" />
          </motion.div>
        );
      case 'thunderstorm':
        return (
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center"
          >
            <WiThunderstorm {...iconProps} className="text-yellow-500" />
          </motion.div>
        );
      case 'snow':
        return (
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex justify-center"
          >
            <WiSnow {...iconProps} className="text-blue-200" />
          </motion.div>
        );
      case 'mist':
      case 'fog':
        return (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center"
          >
            <WiFog {...iconProps} className="text-gray-400" />
          </motion.div>
        );
      default:
        return (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex justify-center"
          >
            <WiDayCloudy {...iconProps} />
          </motion.div>
        );
    }
  };

  return getWeatherIcon();
};