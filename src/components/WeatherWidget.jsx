import { MdLocationOn } from "react-icons/md";
import { GrRefresh } from "react-icons/gr";

export default function WeatherWidget({ weather, unitSymbol, city, refreshWeather }) {

    const date = new Date();

    return(
        <div className="weather-widget">
            <div className="weather-col">
                <div className="weather-desc">
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="wewather-icon" />
                    <p>
                        {weather.weather[0].description} 
                        <span onClick={() => {refreshWeather()}}>
                            <GrRefresh />
                        </span>
                    </p>
                </div>
                <h1 className="temperature">{Math.round(weather.main.temp)}&deg;{unitSymbol}</h1>
            </div>
            <div className="location-col">
                <p>{date.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})} {date.toLocaleString("default", {weekday: "short"})}</p>
                <p>{`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}</p>
                <p className="locale"><MdLocationOn /> {city}</p>
            </div>
        </div>
    );
}