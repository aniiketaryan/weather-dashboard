import React, { useState } from 'react';
import SearchBar from './Components/SearchBar';
import WeatherCard from './Components/WeatherCard';
import ErrorMessage from './Components/ErrorMessage';
import LoadingSpinner from './Components/LoadingSpinner';
import ThemeToggle from './Components/ThemeToggle';


const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async (city) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fa3a1bcb933f5edd838e82dd8e4f7201&units=metric`
            );
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            setWeatherData({
                city: data.name,
                temperature: data.main.temp,
                condition: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: data.weather[0].icon,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
            {/* Centered Content */}
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
                    Weather App
                </h1>
                <SearchBar onSearch={fetchWeather} />
                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}
                {weatherData && (
                    <WeatherCard
                        city={weatherData.city}
                        temperature={weatherData.temperature}
                        condition={weatherData.condition}
                        humidity={weatherData.humidity}
                        windSpeed={weatherData.windSpeed}
                        icon={weatherData.icon}
                    />
                )}
            </div>

            {/* Information at the Bottom */}
            <div className="fixed bottom-0 left-0 w-full text-center bg-gray-800 text-white py-4">
                <p>Created by Aniket Aryan | Current Date: Wednesday, April 09, 2025</p>
            </div>
        </div>
    );
};

export default App;
