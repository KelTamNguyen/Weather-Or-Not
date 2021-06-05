import { useEffect, useState } from "react";
import Header from "./Header";
import Form from "./Form";
import ListItem from "./ListItem";
import actions from "../actions";
import WeatherWidget from "./WeatherWidget";

function Card() {
    const [units, setUnits] = useState("imperial");
    const [unitSymbol, setUnitSymbol] = useState("F")
    const [status, setStatus] = useState(null);
    const [weather, setWeather] = useState(null)

    const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
    const appid = "8e47aca9554bd44b5e4ee66169ab505a";

    const getWeatherAtLocation = () => {
        if (!navigator.geolocation) {
            setStatus("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                //setLon(position.coords.longitude);
                //setLat(position.coords.latitude);
                fetchWeather(position.coords.latitude, position.coords.longitude);
            });
        }
    }

    const fetchWeather = async (lat, lon) => {
        try {
            const url = baseURL + `lat=${lat}&lon=${lon}&appid=${appid}&units=${units}`;
            const response = await fetch(url);
            const json = await response.json();
            setWeather(json);
        } catch(error) {
            console.log(error);
        }
    }

    function getTempUnit(units) {
        switch(units) {
            case "imperial":
                setUnitSymbol("F");
                break;
            case "metric":
                setUnitSymbol("C");
                break;
        }
    }

    useEffect(() => {
        getWeatherAtLocation();
    },[]);

    return (
        <div className="card">
            <Header />
            <div className="container">
                <WeatherWidget weather={weather} unitSymbol={unitSymbol} />
                {actions.map(action => (
                    <ListItem 
                        key={action.id}
                        id={action.id}
                        action={action.action}
                        //removeItem={removeItem}
                    />
                ))}
            </div>
            <Form />
        </div>
    );
}

export default Card;