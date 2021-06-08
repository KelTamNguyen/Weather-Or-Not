import { useEffect, useState } from "react";
import Header from "./Header";
import Form from "./Form";
import ListItem from "./ListItem";
import actions from "../actions";
import WeatherWidget from "./WeatherWidget";
import axios from "axios";
import Loading from "./Loading";

function Card() {
    const [units, setUnits] = useState("imperial");
    const [unitSymbol, setUnitSymbol] = useState("F")
    const [status, setStatus] = useState(null);
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
    const appid = "8e47aca9554bd44b5e4ee66169ab505a";

    function getWeatherAtLocation() {
        if (!navigator.geolocation) {
            setStatus("Geolocation is not supported by your browser");
        } else {
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    const url = baseURL + `lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${appid}&units=${units}`;
                    const response = await axios.get(url);
                    const data = await response.data;
                    setWeather(data);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                }
            });
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
            {loading ? <Loading /> : <WeatherWidget weather={weather} unitSymbol={unitSymbol} />}
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