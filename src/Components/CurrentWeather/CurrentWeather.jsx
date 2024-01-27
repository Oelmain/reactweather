import "./CurrentWeather.css";

const ABSOLUTE_ZERO = 273.15;

const CurrentWeather = ({ data }) => {

  if (!data) {
    return <div>Data is not available</div>;
  }


  if (!data.weather || !data.weather[0]) {
    return <div>Weather information is not available</div>;
  }


  const { city, main, weather, wind } = data;

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{city}</p>
          <p className="weather-description">{weather[0].description}</p>
        </div>
        <img alt="weather" className="weather-icon" src={`${weather[0].icon}.png`} />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(main.temp-ABSOLUTE_ZERO)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{Math.round(main.feels_like-ABSOLUTE_ZERO)}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{wind ? `${wind.speed} m/s` : 'N/A'}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{main ? `${main.humidity}%` : 'N/A'}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{main ? `${main.pressure} hPa` : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
