import React, { useState, useEffect } from 'react';
import { monsters } from './monsters';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [monster, setMonster] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Koordináty pro Brno
  const latitude = 	49.19205060; 
  const longitude = 16.61319090;

  const fetchWeatherAndMonster = async () => {
    try {
      // Načtení počasí
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,rain,wind_speed_10m&hourly=temperature_2m,precipitation,rain,wind_speed_10m&forecast_days=1`
      );
      if (!response.ok) throw new Error('Nepodařilo se načíst data o počasí');
      const data = await response.json();
      setWeather(data);

      // Určení denní/noční doby
      const hours = new Date().getHours();
      const timeOfDay = hours >= 6 && hours < 18 ? 'day' : 'night';

      // Výběr příšery podle počasí a času
      const current = data.current;
      const weatherConditions = [];
      if (current.rain > 0) weatherConditions.push('rain');
      if (current.wind_speed_10m > 50) weatherConditions.push('wind');
      if (current.temperature_2m < 0) weatherConditions.push('cold');
      if (current.temperature_2m > 25) weatherConditions.push('hot');
      if (weatherConditions.length === 0) weatherConditions.push('sunny');

      const filteredMonsters = monsters.filter(m => 
        m.conditions.time.includes(timeOfDay) &&
        m.conditions.weather.some(w => weatherConditions.includes(w) || w === 'any')
      );

      const selectedMonster = filteredMonsters.length > 0
        ? filteredMonsters[Math.floor(Math.random() * filteredMonsters.length)]
        : monsters[Math.floor(Math.random() * monsters.length)];

      setMonster(selectedMonster);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherAndMonster();
    const interval = setInterval(fetchWeatherAndMonster, 60 * 60 * 1000); // Každou hodinu
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={widgetStyle}>
        <p style={textStyle}>Načítám počasí a monstrózní aktivitu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={widgetStyle}>
        <p style={textStyle}>Chyba: {error}</p>
      </div>
    );
  }

  const current = weather.current;
  const isRaining = current.rain > 0;
  const isStrongWind = current.wind_speed_10m > 50;

  return (
    <div style={widgetStyle}>
      <h2 style={titleStyle}>Počasí v Brně ☀️</h2>
      <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}
        </style>
        <p style={textStyle}>
          <strong>Teplota:</strong> {current.temperature_2m} °C
        </p>
        <p style={textStyle}>
          <strong>Déšť:</strong> {isRaining ? `${current.rain} mm/h` : 'Bez deště'}
        </p>
        <p style={textStyle}>
          <strong>Vítr:</strong> {current.wind_speed_10m} km/h
          {isStrongWind && (
            <span style={{ color: '#d4a017', fontWeight: 'bold' }}> ⚠️ Silný vítr!</span>
          )}
        </p>
        <p style={textStyle}>
          <strong>Monstrózní aktivita:</strong> {monster.name} – {
            monster.conditions.time.includes('night') && !monster.conditions.time.includes('day')
              ? `Číhá v temnotách noci!`
              : monster.conditions.weather.includes('rain')
              ? `Vyjde za deště!`
              : monster.conditions.weather.includes('wind')
              ? `Létá v silném větru!`
              : monster.conditions.weather.includes('cold')
              ? `Vychází v mrazu!`
              : monster.conditions.weather.includes('hot')
              ? `Žije v horku!`
              : `Číhá v okolí!`
          }
        </p>
      </div>
    </div>
  );
}

const widgetStyle = {
  backgroundColor: '#2b1e16',
  color: '#e0d8c3',
  padding: '1rem',
  borderRadius: '8px',
  border: '2px solid #d4a017',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  fontFamily: "'Mystery Quest', cursive",
  maxWidth: '100%',
  boxSizing: 'border-box',
};

const titleStyle = {
  margin: '0 0 0.5rem',
  fontSize: '1.5rem',
  color: '#d4a017',
  textAlign: 'center',
};

const textStyle = {
  margin: '0.5rem 0',
  fontSize: '1rem',
  color: '#e0d8c3',
  lineHeight: '1.4',
};

export default WeatherWidget;