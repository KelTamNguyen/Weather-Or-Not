require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Task = require('./models/task');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors);
app.use(morgan('tiny'));

morgan.token('body', (req) => JSON.stringify(req.body));

app.get('/api/tasks', (req, res) => {
	Task.find({}).then(tasks => {
		res.json(tasks.toJSON());
	});
});

app.get('/api/tasks/:id', (req, res, next) => {
	Task.findById(req.params.id)
		.then(task => {
			if (task) {
				res.json(task.toJSON());
			} else {
				res.status(404).end();
			}
		})
		.catch(err => {
			next(err);
		});
});

app.delete('/api/tasks/:id', (req, res, next) => {
	Task.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch(err => next(err));
});

app.post('/api/tasks', (req, res, next) => {
	const body = req.body;

	const task = new Task({
		task: body.task,
		completed: false
	});

	task
		.save()
		.then(savedTask => {
			res.json(savedTask.toJSON());
		})
		.catch(err => next(err));
});

app.put('/api/tasks/:id', (req, res, next) => {
	const body = req.params.body;

	const task = {
		task: body.task,
		completed: body.completed
	};

	Task.findByIdAndUpdate(req.params.id, task, { new: true })
		.then(updatedTask => res.json(updatedTask.toJSON()))
		.catch(err => next(err));
});

const unknownEndpoint = (req, res) => {
	return res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
	console.error(err.message);

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (err.name === 'ValidationError') {
		return res.status(400).send({ error: err.message });
	}

	next(err);
};

app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});