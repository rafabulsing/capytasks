import { v4 as uuid } from 'uuid';

export class Task {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: Date;
    children: Task[];

    constructor(options: Partial<Task>) {
        this.id = options.id || uuid();
        this.title = options.title || '';
        this.completed = options.completed || false;
        this.dueDate = options.dueDate;
        this.children = options.children || [];
    }
};
