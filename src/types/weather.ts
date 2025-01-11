// Common types
interface Coordinates {
  lon: number;
  lat: number;
}

interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface SystemInfo {
  country: string;
  state?: string;
}

// Current weather data
export interface WeatherData {
  name: string;
  sys: SystemInfo;
  coord: Coordinates;
  main: MainWeatherData;
  weather: WeatherCondition[];
  wind: Wind;
  visibility: number;
}

// Forecast data
export interface ForecastData {
  list: Array<{
    dt_txt: string;
    main: MainWeatherData;
    weather: WeatherCondition[];
    wind: Wind;
  }>;
}

// Air quality data
export interface AirQualityData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
    };
  }>;
}

// UV index data
export interface UVData {
  value: number;
}