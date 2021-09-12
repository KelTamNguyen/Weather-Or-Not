// require('dotenv').config();
// const express = require('express');
// var morgan = require('morgan');
// const cors = require('cors');
// const app = express();
// const Task = require('./models/task');

// app.use(express.json());
// app.use(cors);
// app.use(morgan('tiny'));

// morgan.token('body', (req) => JSON.stringify(req.body));

// app.get('/api/tasks', (req, res) => {
// 	// Task.find({})
// 	// 	.then(tasks => {
// 	// 		res.json(tasks);
// 	// 	});
// 	res.json({msg : 'idk man'});
// });

// app.get('/api/tasks/:id', (req, res, next) => {
// 	Task.findById(req.params.id)
// 		.then(task => {
// 			if (task) {
// 				res.json(task.toJSON());
// 			} else {
// 				res.status(404).end();
// 			}
// 		})
// 		.catch(err => {
// 			next(err);
// 		});
// });

// app.delete('/api/tasks/:id', (req, res, next) => {
// 	Task.findByIdAndRemove(req.params.id)
// 		.then(() => {
// 			res.status(204).end();
// 		})
// 		.catch(err => next(err));
// });

// app.post('/api/tasks', (req, res, next) => {
// 	const body = req.body;

// 	const task = new Task({
// 		task: body.task,
// 		completed: false
// 	});

// 	task
// 		.save()
// 		.then(savedTask => {
// 			res.json(savedTask.toJSON());
// 		})
// 		.catch(err => next(err));
// });

// app.put('/api/tasks/:id', (req, res, next) => {
// 	const body = req.params.body;

// 	const task = {
// 		task: body.task,
// 		completed: body.completed
// 	};

// 	Task.findByIdAndUpdate(req.params.id, task, { new: true })
// 		.then(updatedTask => res.json(updatedTask.toJSON()))
// 		.catch(err => next(err));
// });

// const unknownEndpoint = (req, res) => {
// 	return res.status(404).send({ error: 'unknown endpoint' });
// };

// app.use(unknownEndpoint);

// const errorHandler = (err, req, res, next) => {
// 	console.error(err.message);

// 	if (err.name === 'CastError') {
// 		return res.status(400).send({ error: 'malformatted id' });
// 	} else if (err.name === 'ValidationError') {
// 		return res.status(400).send({ error: err.message });
// 	}

// 	next(err);
// };

// app.use(errorHandler);

// const PORT = 3002;
// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
// });

const http = require('http');

const cors = require('cors');
const express = require('express')
const app = express()
app.use(cors());

let tasks = [
	{
		id: 0,
		task: 'Vacuum',
		completed: true
	},
	{
		id: 1,
		task: 'Learn More Code',
		completed: false
	},
	{
		id: 2,
		task: 'Build ToDo List Project',
		completed: false
	},
	{
		id: 3,
		task: 'Netflix',
		completed: false
	},
	{
		id: 4,
		task: 'Chills',
		completed: true
	}
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/tasks', (request, response) => {
  response.json(tasks)
})

app.get('/api/tasks/:id', (req, res) => {
	const id = Number(req.params.id);
	const task = tasks.find(task => task.id === id);
	console.log(task);
	res.json(task);
});

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)