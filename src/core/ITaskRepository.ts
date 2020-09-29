import { TaskCollection } from './TaskCollection';

export interface ITaskRepository {
    loadTasks(): Promise<TaskCollection>;
    saveTasks(tasks: TaskCollection): Promise<void>;
};
