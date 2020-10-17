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

    async deleteTask(path: string[]) {
        await this.repository.deleteTask(path);
    }

    async finishTask(path: string[]) {
        await this.repository.deleteTask(path);
    }
};
