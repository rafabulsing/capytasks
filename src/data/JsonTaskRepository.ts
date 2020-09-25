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
            return this.jsonToTask(jsonTask);
        });
        return tasks;
    }

    async saveTasks(tasks: Task[]): Promise<void> {
        await writeJson(this.filepath, tasks);
    }

    jsonToTask(obj: jsonTask): Task {
        return new Task({
            id: obj.id,
            title: obj.title,
            dueDate: new Date(obj.dueDate),
            completed: obj.completed,
            children: obj.children.map(child => this.jsonToTask(child)),
        });
    }
};

interface jsonTask {
    id: string,
    title: string,
    dueDate: string,
    completed: boolean,
    children: jsonTask[],
};
