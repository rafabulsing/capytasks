import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { v4 as uuid } from 'uuid';

import { TaskService } from './core/TaskService';
import { JsonTaskRepository } from './data/JsonTaskRepository';
import { Task } from './core/Task';

const app = express();
const jsonParser = bodyParser.json();

const port = 3000;
const host = 'localhost';

const taskRepository = new JsonTaskRepository('database.json');
const taskService = new TaskService(taskRepository);

const viewsPath = path.join(__dirname, 'views'); 
app.set('views', viewsPath);
app.set('view engine', 'pug');

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/tasks', async (req, res) => {
	const tasks = await taskService.getTasks();
	return res.status(200).send(tasks);
});

app.post('/task', jsonParser, async (req, res) => {
    const task = new Task({
        title: req.body.title,
        dueDate: new Date(req.body.dueDate),
        completed: false,
        id: uuid(),
    });
    await taskService.createTask(task);
	return res.status(200).send();
});

app.patch('/task/:taskId', jsonParser, async (req, res) => {
    const taskId = req.params.taskId;
    const data = {
        ...req.body,
    }
    await taskService.updateTask(taskId, data);
    return res.status(200).send('Task updated.');
});

app.delete('/task/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    await taskService.deleteTask(taskId);
    return res.status(200).send('Task deleted.');
});

app.get('*', (req, res, next) => {
	res.status(200).send('Sorry, requested page not found.');
	next();
});

app.listen(port, () => {
	console.log(`Server started at ${host} port ${port}`);
});

