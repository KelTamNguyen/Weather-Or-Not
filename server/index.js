require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const Task = require('./models/task');

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:  ', request.path);
	console.log('Body:  ', request.body);
	console.log('---');
	next();
}

app.use(requestLogger);

app.use(cors());
app.use(express.json());

app.get('/api/tasks', (req, res) => {
  Task.find({}).then(tasks => {
	res.json(tasks);
  });
});

app.get('/api/tasks/:id', (req, res) => {
	Task.findById(req.params.id).then(task => res.json(task));
});

app.post('/api/tasks', (req, res) =>{
	const body = req.body;

	if (body.task === undefined) {
		return res.status(400).send({error: "Task Missing!"});
	}

	const task = Task({
		task: body.task,
		completed: body.completed || false,
		date: new Date()
	});

	task.save().then(savedTask => {
		res.json(savedTask);
	});
});

app.put('/api/tasks/:id', (req, res) => {
	const body = req.body;

	if (!body.task) {
		return res.status(400).json({msg : 'no task specified'});
	}

	const task = {
		task: body.task,
		completed: body.completed,
		date: new Date()
	};

	Task.findByIdAndUpdate(req.params.id, task, {new: true}).then(updatedTask => {
		res.json(updatedTask.toJSON());
	});
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)