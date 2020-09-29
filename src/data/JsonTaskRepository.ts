import { ITaskRepository } from '../core/ITaskRepository';
import { Task } from '../core/Task';
import { TaskCollection } from '../core/TaskCollection';
import { readJson, writeJson } from '../util/files';

export class JsonTaskRepository implements ITaskRepository {
    private filepath: string;
    constructor(filepath: string) {
        this.filepath = filepath;
    }

    async loadTasks(): Promise<TaskCollection> {
        const jsonTasks = await readJson(this.filepath);
        return this.jsonToTaskCollection(jsonTasks);
    }

    async saveTasks(tasks: TaskCollection): Promise<void> {
        await writeJson(this.filepath, Object.values(tasks));
    }

    jsonToTask(obj: jsonTask): Task {
        return new Task({
            id: obj.id,
            title: obj.title,
            dueDate: new Date(obj.dueDate),
            completed: obj.completed,
            parent: obj.parent,
            children: obj.children,
        });
    }

    jsonToTaskCollection(jsonTasks: jsonTask[]): TaskCollection {
        return new TaskCollection(jsonTasks.map(jsonTask => this.jsonToTask(jsonTask)))
    }
};

interface jsonTask {
    id: string,
    title: string,
    dueDate: string,
    completed: boolean,
    parent: string,
    children: string[],
}
