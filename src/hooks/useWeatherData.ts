import { useState } from 'react';
import { WeatherData, ForecastData, AirQualityData, UVData } from '../types/weather';
import { fetchWeatherData } from '../components/Weather/WeatherService';

interface WeatherState {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  airQuality: AirQualityData | null;
  uvIndex: UVData | null;
  error: string;
  loading: boolean;
}

export const useWeatherData = () => {
  const [state, setState] = useState<WeatherState>({
    weather: null,
    forecast: null,
    airQuality: null,
    uvIndex: null,
    error: '',
    loading: false
  });

  const handleSearch = async (city: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: '' }));
      
      const data = await fetchWeatherData(city);
      
      setState(prev => ({
        ...prev,
        ...data,
        loading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        weather: null,
        forecast: null,
        airQuality: null,
        uvIndex: null,
        error: 'City not found. Please try again.',
        loading: false
      }));
    }
  };

  const handleLogout = () => {
    setState({
      weather: null,
      forecast: null,
      airQuality: null,
      uvIndex: null,
      error: '',
      loading: false
    });
    localStorage.removeItem('searchHistory');
  };

  return {
    ...state,
    handleSearch,
    handleLogout
  };
};