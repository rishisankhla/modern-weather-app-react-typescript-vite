import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WeatherCard } from '../WeatherCard';
import { DailyTemperature } from '../DailyTemperature';
import { ExploreCard } from '../ExploreCard';
import { UVIndex } from '../UVIndex';
import { AirQuality } from '../AirQuality';
import { Visibility } from '../Visibility';
import { HourlyForecast } from '../HourlyForecast';
import { ForecastSection } from './ForecastSection';
import { WeatherData } from '../../types/weather';

interface WeatherDashboardProps {
  weather: WeatherData;
  forecast?: any;
  airQuality?: any;
  uvIndex?: any;
  onExplore: () => void;
}

const ScrollCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Only apply animations on mobile
  const isMobile = window.innerWidth < 1024;

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [15, 0, -15] : [0, 0, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile ? [0.95, 1, 0.95] : [1, 1, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        scale,
        opacity,
        transformPerspective: "1000px"
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({
  weather,
  forecast,
  airQuality,
  uvIndex,
  onExplore
}) => {
  return (
    <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
      {/* First quarter section */}
      <div className="w-full lg:w-1/4 flex flex-col">
        <ScrollCard>
          <WeatherCard data={weather} />
        </ScrollCard>
        {/* Horizontal divider */}
        <div className="h-px bg-white/20 my-6" />
        <ScrollCard>
          {forecast && <DailyTemperature data={forecast.list} />}
        </ScrollCard>
        <div className="mt-6">
          <ScrollCard>
            <ExploreCard onExplore={onExplore} />
          </ScrollCard>
        </div>
      </div>

      {/* Vertical border line - only visible on desktop */}
      <div className="hidden lg:block w-px bg-white/20" />

      {/* Three quarters section */}
      <div className="flex-1">
        {/* 7-day forecast at the top */}
        <ScrollCard>
          {forecast && <ForecastSection forecast={forecast} />}
        </ScrollCard>
        
        {/* Today's overview heading */}
        <h2 className="text-2xl font-bold text-white mt-0 mb-6">Today's overview</h2>
        
        {/* Grid layout - responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollCard>
            {forecast && <HourlyForecast data={forecast.list.slice(0, 8)} />}
          </ScrollCard>
          <ScrollCard>
            {uvIndex && <UVIndex value={uvIndex.value} />}
          </ScrollCard>
          <ScrollCard>
            {weather && <Visibility visibility={weather.visibility} />}
          </ScrollCard>
        </div>

        {/* Air Quality */}
        <div className="mt-6">
          <ScrollCard>
            {airQuality && (
              <AirQuality 
                aqi={airQuality.list[0].main.aqi}
                components={airQuality.list[0].components}
              />
            )}
          </ScrollCard>
        </div>
      </div>
    </div>
  );
};