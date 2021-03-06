import { ITaskRepository } from '../core/ITaskRepository';
import { Task, SpecialValues } from '../core/Task';
import { readJson, writeJson } from '../util/files';

export class JsonTaskRepository implements ITaskRepository {
    private filepath: string;
    constructor(filepath: string) {
        this.filepath = filepath;
    }

    async loadTasks(): Promise<Task> {
        const jsonTask = (await readJson(this.filepath));
        return this.jsonToTask(jsonTask);
    }

    async saveTasks(tasks: Task): Promise<void> {
        await writeJson(this.filepath, tasks);
    }

    async readTask(path: string[]): Promise<Task> {
        const root = await this.loadTasks();
        let task = root;
        path.forEach(id => {
            const result = task.children.find(child => child.id === id);
            if (!result) {
                throw new Error('Task not found. ' + path);
            }
            task = result;
        });
        return task;
    }

    async updateTask(path: string[], data: Partial<Task>): Promise<void> {
        const root = await this.loadTasks();
        let task = root;
        path.forEach(id => {
            const result = task.children.find(child => child.id === id);
            if (!result) {
                throw new Error('Task not found. ' + path);
            }
            task = result;
        });
        (Object.keys(data) as Array<keyof Task>).forEach(key => (task[key] as any) = data[key]);
        await this.saveTasks(root);
    }

    async createTask(task: Task): Promise<void> {
        const parentPath = task.path.slice(0, -1);
        const root = await this.loadTasks();
        let currentTask = root;
        parentPath.forEach(id => {
            const result = currentTask.children.find(child => child.id === id);
            if (!result) {
                throw new Error('Task not found. ' + parentPath);
            }
            currentTask = result;
        });
        currentTask.children.push(task);
        await this.saveTasks(root);
    }

    async deleteTask(path: string[]): Promise<void> {
        const parentPath = path.slice(0, -1);
        const root = await this.loadTasks();
        let task = root;
        parentPath.forEach(id => {
            const result = task.children.find(child => child.id === id);
            if (!result) {
                throw new Error('Task not found. ' + path);
            }
            task = result;
        });
        task.children = task.children.filter(child => child.id !== path[path.length - 1]);
        await this.saveTasks(root);
    }

    jsonToTask(jsonTask: JsonTask): Task {
        return new Task({
            path: jsonTask.path,
            title: jsonTask.title,
            dueDate: this.jsonToDate(jsonTask.dueDate),
            recurrence: this.jsonToRecurrence(jsonTask.recurrence),
            completed: jsonTask.completed,
            children: jsonTask.children.map(jsonChild => this.jsonToTask(jsonChild)),
        });
    }

    jsonToDate(jsonDate: string): Date | SpecialValues {
        if (Object.values(SpecialValues).includes(jsonDate as SpecialValues)) {
            return jsonDate as SpecialValues;
        };

        return new Date(jsonDate);
    }

    jsonToRecurrence(jsonRecurrence: number | string): number | SpecialValues {
        if (typeof jsonRecurrence === 'number') {
            return jsonRecurrence as number;
        }

        return jsonRecurrence as SpecialValues;
    }
};

interface JsonTask {
    path: string[],
    title: string,
    dueDate: string,
    recurrence: string | number,
    completed: boolean,
    parent: string,
    children: JsonTask[],
}
