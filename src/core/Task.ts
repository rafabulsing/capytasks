import { v4 as uuid } from 'uuid';

export enum SpecialValues {
    Inherit = 'Inherit',
}

export class Task {
    id: string;
    path: string[];
    title: string;
    completed: boolean;
    dueDate?: Date | SpecialValues;
    recurrence: number | SpecialValues;
    children: Task[];

    constructor(options: Partial<Task>) {
        this.id = options.id || uuid();
        this.path = options.path || [this.id];
        this.title = options.title || '';
        this.completed = options.completed || false;
        this.dueDate = options.dueDate;
        this.recurrence = options.recurrence || SpecialValues.Inherit;
        this.children = options.children || [];
    }
}
