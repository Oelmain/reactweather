import { useState } from 'react';
import './App.css';
import CurrentWeather from './Components/CurrentWeather/CurrentWeather';
import Search from './Components/Search/Search';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Forecast from './Components/Forecast/Forecast';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split("");

        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (responses) => {
                const [weatherResponse, forecastResponse] = await Promise.all(responses.map(response => response.json()));

                setWeatherData({ city: searchData.label, ...weatherResponse });
                setForecastData({ city: searchData.label, ...forecastResponse });
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }

    console.log(weatherData);
    console.log(forecastData);

    return (
        <div className='container'>
            <Search onSearchChange={handleOnSearchChange} />
            {weatherData && <CurrentWeather data={weatherData} />}
            {forecastData && <Forecast data={forecastData} />}
        </div>
    );
}

export default App;
