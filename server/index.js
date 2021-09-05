require('dotenv').config();
const express = require('express');
const Task = require('./models/task');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

morgan.token('body', (req) => JSON.stringify(req.body))

app.get('/api/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.json(tasks);
    });
});

app.get('/api/tasks/:id', (req, res) => {
    Task.findById(req.params.id).then(task => {
        res.json(task);
    });
});

app.delete('/api/tasks/:id', (req, res) => {
    Task.remove({ id: req.params.id });
    res.status(204).end();
});

app.post('/api/tasks', (req, res) => {
    const body = req.body;

    const task = new Task({
        task: body.task,
        completed: false
    });

    task.save().then(savedTask => {
        res.json(savedTask);
    });
});

const PORT = 3001;
app.listen(PORT);