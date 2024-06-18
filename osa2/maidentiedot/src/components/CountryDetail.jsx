import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetail = ({country}) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY
    const capital = country.capital[0]

let weatherInfo;
    if (weather) {
        weatherInfo = (
            <div>
                <h3>Weather in {capital}</h3>
                <div>Temperature: {weather.main.temp} Celsius</div>
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                />
                <div>Wind: {weather.wind.speed} m/s</div>
            </div>
        )
    }

    useEffect(() => {
        if (capital) {
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => {
              setWeather(response.data);
            })
            .catch(error => {
              console.error('Error fetching weather data:', error);
            });
        }
      }, [capital, api_key]);

    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map((language => (
                    <li key={language}>{language}</li>
                )))}
            </ul>
            <img src={country.flags.png} width="150" />
            {weatherInfo}
        </div>
    )
}
export default CountryDetail