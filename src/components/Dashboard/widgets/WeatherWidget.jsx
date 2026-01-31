import { useState, useEffect } from 'react';

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    temp: 72,
    condition: 'Partly Cloudy',
    location: 'San Francisco',
    humidity: 65,
    windSpeed: 8,
    icon: '⛅'
  });

  const weatherIcons = {
    'Sunny': '☀️',
    'Partly Cloudy': '⛅',
    'Cloudy': '☁️',
    'Rainy': '🌧️',
    'Stormy': '⛈️',
    'Snowy': '❄️',
    'Foggy': '🌫️'
  };

  const conditions = Object.keys(weatherIcons);

  useEffect(() => {
    // Simulate weather updates
    const interval = setInterval(() => {
      setWeather(prev => {
        const newCondition = conditions[Math.floor(Math.random() * conditions.length)];
        return {
          ...prev,
          temp: Math.floor(Math.random() * 30) + 60,
          condition: newCondition,
          icon: weatherIcons[newCondition],
          humidity: Math.floor(Math.random() * 40) + 40,
          windSpeed: Math.floor(Math.random() * 20) + 5
        };
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="text-white/80 text-xs font-medium mb-2">Weather</div>
      
      <div className="text-center">
        <div className="text-4xl mb-2">{weather.icon}</div>
        <div className="text-3xl font-light text-white mb-1">{weather.temp}°F</div>
        <div className="text-sm text-white/90 mb-3">{weather.condition}</div>
        
        <div className="text-xs text-white/60 border-t border-white/20 pt-2">
          <div>{weather.location}</div>
          <div className="flex justify-between mt-1">
            <span>💧 {weather.humidity}%</span>
            <span>💨 {weather.windSpeed}mph</span>
          </div>
        </div>
      </div>
    </div>
  );
}