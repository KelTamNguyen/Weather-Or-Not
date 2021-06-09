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
    const [unitSymbol, setUnitSymbol] = useState("F");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState(null);

    const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
    const OPENWEATHER_ID = "8e47aca9554bd44b5e4ee66169ab505a";
    const LOCATIONIQ_ID = "pk.8546199d5ee906e4ec8353313c26f735";

    function getWeatherAtLocation() {
        if (navigator.geolocation) {  
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    let url = OPENWEATHER_URL + `lat=${lat}&lon=${lon}&appid=${OPENWEATHER_ID}&units=${units}`;
                    const response = await axios.get(url);
                    setWeather(response.data);
                    getCity(lat, lon);
                } catch (error) {
                    console.log(error);
                }
            });
        }
    }

    function getCity(lat, lon) {
        axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_ID}&lat=${lat}&lon=${lon}&format=json`).then(
            (response) => {
                let address = response.data.address;
                setCity(address.city);
                setLoading(false);
            }
        ).catch((error) => {
            console.log(error);
        })
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
            {loading ? <Loading /> : city && <WeatherWidget weather={weather} city={city} unitSymbol={unitSymbol} />}
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