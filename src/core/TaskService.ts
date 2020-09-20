import { Task } from "./Task";
import { ITaskRepository } from "./ITaskRepository";

export class TaskService {
    private repository: ITaskRepository;

    constructor(repository: ITaskRepository) {
        this.repository = repository;
    }

    async getTasks(): Promise<Task[]|Error> {
        return this.repository.loadTasks();    
    }

    async createTask(task: Task): Promise<void> {
        const tasks = await this.repository.loadTasks();
        tasks.push(task);
        await this.repository.saveTasks(tasks);
    }

    async completeTask(title: string): Promise<Task|Error> {
        const tasks = await this.repository.loadTasks();
        const index = tasks.findIndex(task => task.title === title);
        if (index !== undefined) {
            tasks[index].completed = true;
            await this.repository.saveTasks(tasks);
            return tasks[index];
        } else {
            return new Error('Task not found.');
        }
    }

    async updateTask(id: string, data: Partial<Task>) {
        const tasks = await this.repository.loadTasks();
        const index = tasks.findIndex(task => task.id === id);
        if (index !== undefined) {
            tasks[index] = {
                ...tasks[index],
                ...data,
            };
            await this.repository.saveTasks(tasks);
        }
    }
};
