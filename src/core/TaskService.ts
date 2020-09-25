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

    async updateTask(id: string, data: Partial<Task>) {
        const tasks = await this.repository.loadTasks();
        this.changeTask(tasks, data, task => task.id === id);
        await this.repository.saveTasks(tasks);
    }

    async deleteTask(id: string) {
        const tasks = await this.repository.loadTasks();
        const filteredTasks = tasks.filter(task => task.id !== id);
        await this.repository.saveTasks(filteredTasks);
    }
    
    findTask(tasks: Task[], predicate: (task: Task) => boolean): Task | undefined {
        return tasks.find(task => {
            return predicate(task)
                ? task
                : this.findTask(task.children, predicate);
        });
    }

    async getTask(id: string) {
        const tasks = await this.repository.loadTasks();
        return this.findTask(tasks, (task => task.id === id));
    }

    changeTask(tasks: Task[], data: Partial<Task>, predicate: (task: Task) => boolean): void {
        tasks.forEach(task => {
            if (predicate(task)) {
                (Object.keys(data) as Array<keyof typeof data>).forEach(key => (task[key] as any) = data[key]);
            }
            this.changeTask(task.children, data, predicate);
        });
    }
};
