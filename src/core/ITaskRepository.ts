import { Task } from './Task';

export interface ITaskRepository {
    loadTasks(): Promise<Task[]>;
    saveTasks(tasks: Task[]): Promise<void>;
};
