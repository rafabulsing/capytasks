import { AtLeast } from '../util/types';

export enum SpecialValues {
    Inherit = 'Inherit',
}

export type TaskProperties = AtLeast<Task, 'path'>;

export class Task {
    path: string[];
    title: string;
    completed: boolean;
    dueDate?: Date | SpecialValues;
    recurrence?: number | SpecialValues;
    children: Task[];

    constructor(options: TaskProperties) {
        this.path = options.path;
        this.title = options.title || '';
        this.completed = options.completed || false;
        this.dueDate = options.dueDate;
        this.recurrence = options.recurrence;
        this.children = options.children || [];
    }

    get id(): string {
        return this.path[this.path.length - 1];
    }
}
