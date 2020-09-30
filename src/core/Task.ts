import { v4 as uuid } from 'uuid';

export enum SpecialDueDate {
    Inherit = 'Inherit',
}

export class Task {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: Date | SpecialDueDate;
    children: string[];
    parent: string | null;

    constructor(options: Partial<Task>) {
        this.id = options.id || uuid();
        this.title = options.title || '';
        this.completed = options.completed || false;
        this.dueDate = options.dueDate;
        this.children = options.children || [];
        this.parent = options.parent || null;
    }
}
