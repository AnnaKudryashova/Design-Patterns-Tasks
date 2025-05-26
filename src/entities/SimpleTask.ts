import { TaskComponent } from '../core/tasks/TaskComponent';
import { TaskStatus } from '../types/taskTypes';
import { User } from './User';

export class SimpleTask implements TaskComponent {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public reporter: User,
        public status: TaskStatus = 'TODO',
        public assignee?: User
    ) {}

    getDetails(): string {
        return `Task: ${this.title} - ${this.status} (Reporter: ${this.reporter.getFullName()})`;
    }
}