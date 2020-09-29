import { Task } from './Task';

export class TaskCollection {
    [key: string]: Task;

    constructor(tasks: Task[]) {
        tasks.forEach(task => {
            this[task.id] = (task);
        })
    }
}
