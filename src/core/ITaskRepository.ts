import { Task } from './Task';

export interface ITaskRepository {
    createTask(task: Task): Promise<void>;
    readTask(path: string[]): Promise<Task>;
    updateTask(path: string[], data: Partial<Task>): Promise<void>;
    deleteTask(path: string[]): Promise<void>;
};
