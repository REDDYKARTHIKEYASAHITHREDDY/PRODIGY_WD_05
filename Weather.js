import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'fcafb9ff862262416e397e5372e6dcaa'; // Your OpenWeatherMap API key

  const handleLocationInput = (event) => {
    setLocation(event.target.value);
  };

  const handleFetchWeather = () => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        setWeatherData(response.data);
        setError('');
      })
      .catch((error) => {
        console.error(error);
        setError('Unable to retrieve weather data');
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={location}
        onChange={handleLocationInput}
        placeholder="Enter city name"
      />
      <button onClick={handleFetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weatherData && weatherData.main && weatherData.weather && (
        <div className="weather-container">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
