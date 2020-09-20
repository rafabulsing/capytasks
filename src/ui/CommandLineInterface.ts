import { program } from 'commander';
import { JsonTaskRepository } from '../data/JsonTaskRepository';
import { TaskService } from '../core/TaskService';
import { Task } from '../core/Task';

const taskRepository = new JsonTaskRepository('database.json');
const taskService = new TaskService(taskRepository);

program
    .command('create <title> [dueDate]')
    .description('Create new task')
    .action(async (title, dueDate) => {
        const task = new Task({ title, dueDate, completed: false });
        await taskService.createTask(task);
        console.log('Task created.', task);
    })
;

program.command('complete <title>')
    .description('Complete existing task')
    .action(async (name) => {
        const result = await taskService.completeTask(name);
        if (result instanceof Error) {
            console.log('Error: ', result.message);
            return;
        }
        console.log('Task completed.', result);
    })
;

program.command('list')
    .description('Lists all tasks')
    .action(async () => {
        const result = await taskService.getTasks();
        if (result instanceof Error) {
            console.log('Error: ', result.message);
            return;
        }
        result.forEach((task: Task) => {
            console.log(task);
        });
    })
;

export { program };
