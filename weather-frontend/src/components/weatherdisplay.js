import React, { useState } from 'react';
import axios from 'axios';


function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
            setWeather(response.data);
            setError('');
        } catch (err) {
            setWeather(null);
            setError(err.response ? err.response.data.error : 'An error occurred');
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
        document.body.classList.toggle('light-mode', isDarkMode);
    };

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <h1>Weather Information</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                fetchWeather();
            }}>
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city" 
                    id="city-input"
                />
                <button type="submit">Get Weather</button>
                <button onClick={toggleTheme} id="toggle-button">
                <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            </form>
            {weather && (
                <div className="weather-card">
                    <h2>{weather.name}, {weather.country}</h2>
                    <p>Temperature: {weather.temp} °C</p>
                    <p>Weather: {weather.weather}</p>
                    <p>Description: {weather.description}</p>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.wind_speed} m/s</p>
                    <p>Date: {weather.date}</p>
                    <p>Time: {weather.time}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
        </div>
    );
}

export default App;
