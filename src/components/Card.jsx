import { useEffect, useState } from "react";
import Header from "./Header";
import Form from "./Form";
import ListItem from "./ListItem";
import WeatherWidget from "./WeatherWidget";
import axios from "axios";
import Loading from "./Loading";
import { nanoid } from "nanoid";
const OPENWEATHER_ID = require("../config").OPENWEATHER_ID;
const OPENWEATHER_URL = require("../config").OPENWEATHER_URL;
const LOCATIONIQ_ID = require("../config").LOCATIONIQ_ID;
//import { TaskProvider } from "../TaskContext";

export default function Card(props) {
    const [units, setUnits] = useState("imperial");
    const [unitSymbol, setUnitSymbol] = useState("F");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState(null);
    const [tasks, setTasks] = useState([]);

    const OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";

    function getWeatherAtLocation() {
        if (navigator.geolocation) {  
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    let url = OPENWEATHER_URL + `lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=${units}`;
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
        axios
            .get(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.LOCATIONIQ_ID}&lat=${lat}&lon=${lon}&format=json`)
            .then((response) => {
                let address = response.data.address;
                setCity(address.city);
                setLoading(false);
            })
            .catch((error) => {
            console.log(error);
            })
    }

    useEffect(() => {
        axios
            .get('http://localhost:3001/tasks')
            .then(response => setTasks(response.data));
        getWeatherAtLocation();
    }, []);

    function refreshWeather() {
        setLoading(true);
        getWeatherAtLocation();
    }

    function removeItem(id) {
        const newTodoList = tasks.filter(todo => todo.id !== id);
        setTasks(newTodoList);
    }

    function editItem(id, newName) {
        const editedTodoList = tasks.map(todo => {
            if (id === todo.id) {
                return {...todo, action: newName}
            }
            return todo
        });
        setTasks(editedTodoList);
    }

    function addTask(name) {
        if (tasks.filter(todo => todo.action === name).length === 0) {
            const newTask = {id: nanoid(), task: name, completed: false};
            setTasks(tasks.concat(newTask));
        } else {
            alert(`Item "${name}" already exists`)
        }
    }

    function toggleActiveStatus(id) {
        let updatedTaskList = tasks.map(todo => {
            if (todo.id === id) {
                return {...todo, active: !todo.active}
            } 
            return todo;
        });
        setTasks(updatedTaskList);
    }

    return (
    <div className="card">
            <Header />
            <div className="container">
                {loading ? <Loading /> : city && <WeatherWidget weather={weather} city={city} unitSymbol={unitSymbol} refreshWeather={refreshWeather} />}
                <div className="dashboard">
                    <h4>{tasks.length} task(s) left</h4>
                    <hr />
                    <h4>Active</h4>
                    <hr />
                    <h4>weather-effected</h4>
                </div>
                <ul aria-labelledby="list-heading">
                    {tasks.map(todo => (
                        <ListItem 
                            key={todo.id}
                            id={todo.id}
                            //action={todo.action}
                            action={todo.task}
                            removeItem={removeItem}
                            editItem={editItem}
                            completed={todo.completed}
                            toggleActiveStatus={toggleActiveStatus}
                        />
                    ))}
                </ul>
            </div>
            <Form addTask={addTask} />
        </div>
    );
}