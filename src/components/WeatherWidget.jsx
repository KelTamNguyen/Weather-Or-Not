import { MdLocationOn } from "react-icons/md";

function WeatherWidget({ weather, unitSymbol }) {

    const date = new Date();

    return(
        <div className="weather-widget">
            <div className="weather-col">
                <div className="weather-desc">
                    {weather && <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="wewather-icon" />}
                    {weather && <p>{weather.weather[0].description}</p>}
                </div>
                {weather && <h1 className="temperature">{Math.round(weather.main.temp)}&deg;{unitSymbol}</h1>}
            </div>
            <div className="location-col">
                {weather && <p>{date.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})} {date.toLocaleString("default", {weekday: "short"})}</p>}
                {weather && <p>{`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}</p>}
                {weather && <p className="locale"><MdLocationOn /> {`${weather.name}, ${weather.sys.country}`}</p>}
            </div>
        </div>
    );
}

export default WeatherWidget;