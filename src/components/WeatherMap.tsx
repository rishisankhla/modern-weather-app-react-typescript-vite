import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';

interface WeatherMapProps {
  lon: number;
  lat: number;
  layer: 'temp_new' | 'precipitation_new' | 'clouds_new' | 'pressure_new' | 'wind_new';
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ 
  lon, 
  lat, 
  layer
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
          }),
          new TileLayer({
            source: new XYZ({
              url: `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=a5dae4614b8c7c6c19cd8699e1578d4f`,
              attributions: '© OpenWeatherMap'
            }),
            opacity: 0.6
          })
        ],
        view: new View({
          center: fromLonLat([lon, lat]),
          zoom: 6
        })
      });
    }

    // Update map center when coordinates change
    if (lon && lat && mapInstanceRef.current) {
      mapInstanceRef.current.getView().animate({
        center: fromLonLat([lon, lat]),
        duration: 1000
      });
    }

    // Update weather layer when layer type changes
    if (mapInstanceRef.current) {
      const layers = mapInstanceRef.current.getLayers();
      const weatherLayer = layers.getArray()[1];
      const newSource = new XYZ({
        url: `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=a5dae4614b8c7c6c19cd8699e1578d4f`,
        attributions: '© OpenWeatherMap'
      });
      weatherLayer.setSource(newSource);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [lon, lat, layer]);

  return (
    <div ref={mapRef} className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg bg-zinc-900" />
  );
};