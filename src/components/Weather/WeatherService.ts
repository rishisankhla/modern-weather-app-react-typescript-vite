import axios from 'axios';
import { WeatherData, ForecastData, AirQualityData, UVData } from '../../types/weather';

const API_KEY = 'a5dae4614b8c7c6c19cd8699e1578d4f';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric'
  }
});

export const fetchWeatherData = async (city: string) => {
  const [weatherResponse, forecastResponse] = await Promise.all([
    api.get<WeatherData>(`/weather`, { params: { q: city } }),
    api.get<ForecastData>(`/forecast`, { params: { q: city, cnt: 56 } })
  ]);

  const { lat, lon } = weatherResponse.data.coord;

  const [airQualityResponse, uvResponse] = await Promise.all([
    api.get<AirQualityData>(`/air_pollution`, { params: { lat, lon } }),
    api.get<UVData>(`/uvi`, { params: { lat, lon } })
  ]);

  return {
    weather: weatherResponse.data,
    forecast: forecastResponse.data,
    airQuality: airQualityResponse.data,
    uvIndex: uvResponse.data
  };
};