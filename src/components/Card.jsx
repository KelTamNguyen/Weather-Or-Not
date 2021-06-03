import { useEffect, useState } from "react";
import Header from "./Header";
import Form from "./Form";
import ListItem from "./ListItem";
import actions from "../actions";

function Card() {
    // const [actions, setActions] = useState(actions);
    
    // function removeItem(id) {
    //     const newActions = actions.filter((action) => action.id !== id);
    //     setActions(newActions);
    // }

    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [units, setUnits] = useState("imperial");
    const [unitSymbol, setUnitSymbol] = useState("F")
    const [status, setStatus] = useState(null);
    const [data, setData] = useState(null)

    const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
    const appid = "8e47aca9554bd44b5e4ee66169ab505a";

    const getWeatherAtLocation = () => {
        if (!navigator.geolocation) {
            setStatus("Geolocation is not supported by your browser");
        } else {
            setStatus("Loading...");
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus("Success!");
                setLon(position.coords.longitude);
                setLat(position.coords.latitude);
                fetchWeather(position.coords.latitude, position.coords.longitude);
            }, () => {
                setStatus("Unable to retrieve your location");
            });
        }
    }

    const fetchWeather = async (lat, lon) => {
        try {
            const url = baseURL + `lat=${lat}&lon=${lon}&appid=${appid}&units=${units}`;
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
        } catch(error) {
            console.log(error);
        }
    }

    function getTempUnit() {
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
                <section>
                    <p>{status}</p>
                    {data && <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />}
                    {data && <p>{data.main.temp}&deg;{unitSymbol}</p>}
                </section>
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