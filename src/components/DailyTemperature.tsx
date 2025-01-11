import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { ForecastData } from '../types/weather';

interface DailyTemperatureProps {
  data: ForecastData['list'];
}

interface TimeSegment {
  name: string;
  temp: number;
  range: [number, number]; // 24-hour format
}

const timeSegments: TimeSegment[] = [
  { name: 'Morning', temp: 0, range: [6, 11] },
  { name: 'Afternoon', temp: 0, range: [12, 17] },
  { name: 'Evening', temp: 0, range: [18, 23] },
  { name: 'Night', temp: 0, range: [0, 5] },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 px-3 py-2 rounded-lg shadow-lg border border-zinc-700">
        <p className="text-yellow-300 font-medium">{`${payload[0].value}°C`}</p>
      </div>
    );
  }
  return null;
};

export const DailyTemperature: React.FC<DailyTemperatureProps> = ({ data }) => {
  const calculateAverageTemperatures = () => {
    const segmentTemps = timeSegments.map(segment => {
      const segmentData = data.filter(item => {
        const hour = new Date(item.dt_txt).getHours();
        return hour >= segment.range[0] && hour <= segment.range[1];
      });

      const avgTemp = segmentData.reduce((sum, item) => sum + item.main.temp, 0) / 
        (segmentData.length || 1);

      return {
        name: segment.name,
        temp: Math.round(avgTemp),
      };
    });

    return segmentTemps;
  };

  const chartData = calculateAverageTemperatures();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <Thermometer className="text-yellow-300" size={20} />
        <h3 className="text-white text-lg font-medium">Temperature</h3>
      </div>

      <div className="h-[100px] mb-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="temperatureGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.4} />
                <stop offset="33%" stopColor="#FBBF24" stopOpacity={1} />
                <stop offset="66%" stopColor="#FBBF24" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="temp"
              stroke="url(#temperatureGradient)"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: '#000',
                stroke: '#FBBF24',
                strokeWidth: 2
              }}
              activeDot={{
                r: 6,
                fill: '#000',
                stroke: '#FCD34D',
                strokeWidth: 2
              }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {chartData.map((segment) => (
          <div key={segment.name} className="text-center">
            <p className="text-gray-300 text-xs mb-1">{segment.name}</p>
            <p className="text-white text-sm font-medium">{segment.temp}°</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};