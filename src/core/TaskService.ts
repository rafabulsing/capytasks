import { Task } from './Task';
import { v4 as uuid } from 'uuid';
import { ITaskRepository } from './ITaskRepository';

export class TaskService {
    private repository: ITaskRepository;

    constructor(repository: ITaskRepository) {
        this.repository = repository;
    }

    async getTasks(): Promise<Task> {
        return await this.repository.readTask([]); 
    }

    async updateTask(path: string[], data: Partial<Task>) {
        return await this.repository.updateTask(path, data);
    }

    async createTask(parentPath: string[], data: Partial<Task>): Promise<void> {
        const task = new Task({
            ...data,
            path: [...parentPath, uuid()],
        });
        await this.repository.createTask(task);
    }

    // async updateTask(id: string, data: Partial<Task>) {
    //     const tasks = await this.repository.loadTasks();
    //     if (data.id && data.id !== id) {
    //         throw new Error('Mismatch in ids.');
    //     }
    //     const task = tasks[id];
    //     if (!task) {
    //         throw new Error('Task not found.');
    //     }
    //     tasks[task.id] = { ...task, ...data };
    //     await this.repository.saveTasks(tasks);
    // }

    // async deleteTask(id: string) {
    //     const tasks = await this.repository.loadTasks();
    //     delete tasks[id];
    //     await this.repository.saveTasks(tasks);
    // }

    // async getTask(id: string) {
    //     const tasks = await this.repository.loadTasks();
    //     return tasks[id];
    // }
};
