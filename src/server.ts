import express from 'express';
import bodyParser from 'body-parser';
import path from "path";

import { TaskService } from './core/TaskService';
import { JsonTaskRepository } from './data/JsonTaskRepository';

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

app.patch('/task/:taskId', jsonParser, async (req, res) => {
    const taskId = req.params.taskId;
    const data = {
        ...req.body,
    }
    await taskService.updateTask(taskId, data);
    return res.status(200).send('Task updated.');
});

app.get('*', (req, res, next) => {
	res.status(200).send('Sorry, requested page not found.');
	next();
});

app.listen(port, () => {
	console.log(`Server started at ${host} port ${port}`);
});

