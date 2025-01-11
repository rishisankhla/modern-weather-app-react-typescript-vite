import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface HourlyForecastProps {
  data: Array<{
    dt_txt: string;
    main: {
      temp: number;
    };
    wind: {
      speed: number;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 px-3 py-2 rounded-lg shadow-lg border border-zinc-700">
        <p className="text-yellow-300 font-medium">{`${payload[0].value.toFixed(1)} km/h`}</p>
      </div>
    );
  }
  return null;
};

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const formatData = data.slice(0, 24).map(item => ({
    time: new Date(item.dt_txt).toLocaleTimeString([], { 
      hour: '2-digit',
      hour12: true 
    }),
    wind: Number((item.wind.speed * 3.6).toFixed(2)), // Convert m/s to km/h
  }));

  const currentTime = new Date().toLocaleTimeString([], { 
    hour: '2-digit',
    minute: '2-digit',
    hour12: true 
  });

  // Calculate the maximum wind speed to set the domain
  const maxWind = Math.max(...formatData.map(item => item.wind));
  const yAxisDomain = [0, Math.ceil(maxWind * 1.2)]; // Add 20% padding to the top

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <Wind className="text-blue-400" />
        <h3 className="text-white text-lg font-medium">Wind Status</h3>
      </div>

      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formatData} barSize={8}>
            <defs>
              <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity={1} />
                <stop offset="50%" stopColor="#FBBF24" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={30}
              domain={yAxisDomain}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(255,255,255,0.1)' }}
            />
            <Bar
              dataKey="wind"
              fill="url(#windGradient)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-white">
          <span className="text-2xl font-bold">{formatData[0].wind.toFixed(1)}</span>
          <span className="text-sm text-gray-400 ml-1">km/h</span>
        </div>
        <div className="text-sm text-gray-400">{currentTime}</div>
      </div>
    </motion.div>
  );
};