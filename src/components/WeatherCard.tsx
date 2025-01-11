import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherIcon: React.FC<{ type: string }> = ({ type }) => {
  const getWeatherIcon = () => {
    const baseUrl = "https://basmilius.github.io/weather-icons/production/fill/all/";
    
    switch (type.toLowerCase()) {
      case 'clear':
        return `${baseUrl}clear-day.svg`;
      case 'clouds':
        return `${baseUrl}cloudy.svg`;
      case 'rain':
        return `${baseUrl}rain.svg`;
      case 'thunderstorm':
        return `${baseUrl}thunderstorms.svg`;
      case 'snow':
        return `${baseUrl}snow.svg`;
      case 'mist':
      case 'fog':
        return `${baseUrl}fog.svg`;
      default:
        return `${baseUrl}partly-cloudy-day.svg`;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="w-24 h-24"
    >
      <img
        src={getWeatherIcon()}
        alt={`${type} weather icon`}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black rounded-xl text-white w-full"
    >
      <div className="flex flex-col space-y-4 p-6">
        {/* Location */}
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-gray-400">
            {data.sys.state ? `${data.sys.state}, ` : ''}{data.sys.country}
          </p>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-start">
          <WeatherIcon type={data.weather[0].main} />
        </div>

        {/* Temperature and Weather Description */}
        <div className="w-full flex justify-between">
          <div className="flex items-baseline">
            <span className="text-6xl font-bold">{Math.round(data.main.temp)}</span>
            <span className="text-2xl ml-1">°C</span>
          </div>
          <div className="text-right">
            <span className="text-2xl capitalize text-white leading-tight block">
              {data.weather[0].description.split(' ').slice(0, -1).join(' ')}
            </span>
            <span className="text-2xl capitalize text-white leading-tight block">
              {data.weather[0].description.split(' ').slice(-1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};