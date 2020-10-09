import { option } from 'commander';
import { v4 as uuid } from 'uuid';

export enum SpecialValues {
    Inherit = 'Inherit',
}

export class Task {
    path: string[];
    title: string;
    completed: boolean;
    dueDate?: Date | SpecialValues;
    recurrence: number | SpecialValues;
    children: Task[];

    constructor(options: Partial<Task>) {
        this.path = options.path || [];
        this.title = options.title || '';
        this.completed = options.completed || false;
        this.dueDate = options.dueDate;
        this.recurrence = options.recurrence || SpecialValues.Inherit;
        this.children = options.children || [];
    }

    get id(): string {
        return this.path[this.path.length - 1];
    }
}
