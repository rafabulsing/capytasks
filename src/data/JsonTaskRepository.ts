import { ITaskRepository } from '../core/ITaskRepository';
import { Task } from '../core/Task';
import { readJson, writeJson } from '../util/files';

export class JsonTaskRepository implements ITaskRepository {
    private filepath: string;
    constructor(filepath: string) {
        this.filepath = filepath;
    }

    async loadTasks(): Promise<Task[]> {
        const jsonTasks = await readJson(this.filepath);
        const tasks = jsonTasks.map((jsonTask: any) => {
            return new Task(jsonTask); 
        })
        return tasks;
    }

    async saveTasks(tasks: Task[]): Promise<void> {
        await writeJson(this.filepath, tasks);
    }
};
