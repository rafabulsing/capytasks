import { ITaskRepository } from '../core/ITaskRepository';
import { Task, SpecialDueDate } from '../core/Task';
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

    jsonToTask(jsonTask: JsonTask): Task {
        return new Task({
            id: jsonTask.id,
            title: jsonTask.title,
            dueDate: this.jsonToDate(jsonTask.dueDate),
            completed: jsonTask.completed,
            parent: jsonTask.parent,
            children: jsonTask.children,
        });
    }

    jsonToDate(jsonDate: string): Date | SpecialDueDate {
        if (Object.values(SpecialDueDate).includes(jsonDate as SpecialDueDate)) {
            return jsonDate as SpecialDueDate;
        };

        return new Date(jsonDate);
    }

    jsonToTaskCollection(jsonTasks: JsonTask[]): TaskCollection {
        return new TaskCollection(jsonTasks.map(jsonTask => this.jsonToTask(jsonTask)))
    }
};

interface JsonTask {
    id: string,
    title: string,
    dueDate: string,
    completed: boolean,
    parent: string,
    children: string[],
}
