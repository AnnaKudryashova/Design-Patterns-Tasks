import { TaskComponent } from '../../core/tasks/TaskComponent';
import { User } from '../../entities/User';
import { TaskStatus } from '../../types/taskTypes';

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
        return `[${this.id}] ${this.title} (${this.status})` +
               (this.assignee ? ` → ${this.assignee.getFullName()}` : '');
    }
}