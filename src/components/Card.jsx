/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Header from './Header';
import Form from './Form';
import ListItem from './ListItem';
import WeatherWidget from './WeatherWidget';
import axios from 'axios';
import Loading from './Loading';
import { nanoid } from 'nanoid';
import taskService from '../services/tasks.js';

export default function Card(props) {
	const [units, setUnits] = useState('imperial');
	const [unitSymbol, setUnitSymbol] = useState('F');
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(true);
	const [city, setCity] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [userInput, setUserInput] = useState('');

	const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

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
			.get(`https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_LOCATIONIQ_ID}&lat=${lat}&lon=${lon}&format=json`)
			.then((response) => {
				let address = response.data.address;
				setCity(address.city);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		taskService
			.getTasks()
			.then(initialTasks => {
				setTasks(initialTasks);
			});
		getWeatherAtLocation();
	}, []);

	function refreshWeather() {
		setLoading(true);
		getWeatherAtLocation();
	}

	function removeTask(id) {
		const newTodoList = tasks.filter(todo => todo.id !== id);
		setTasks(newTodoList);
	}

	function editTask(id, newName) {
		const task = tasks.find(task => task.id === id);

		const newTask = {
			...task,
			task: newName
		}
		
		taskService
			.updateTask(id, newTask)
			.then(updatedTask => setTasks(tasks.map(task => task.id !== id ? task : updatedTask)));
	}

	function addTask(name) {
		if (tasks.filter(todo => todo.task === name).length === 0) {
			
			const newTask = {
				id: nanoid(), 
				task: name, 
				completed: false
			};

			taskService
				.addTask(newTask)
				.then(newTask => {
					setTasks(tasks.concat(newTask));
				});
		} else {
			alert(`Item "${name}" already exists`);
		}
	}

	function toggleCompletionStatus(id) {
		const task = tasks.find(task => task.id === id);
		const changedTask = { ...task, completed: !task.completed };
		taskService
			.updateTask(id, changedTask)
			.then(updatedTask => setTasks(tasks.map(task => task.id !== id ? task : updatedTask)));
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
							task={todo.task}
							removeTask={removeTask}
							editTask={editTask}
							completed={todo.completed}
							toggleCompletionStatus={toggleCompletionStatus}
						/>
					))}
				</ul>
			</div>
			<Form addTask={addTask} />
		</div>
	);
}