import { TaskComponent } from '../../core/tasks/TaskComponent';
import { User } from '../User';
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
        return `id: ${this.id} ${this.title} (${this.status})\n` +
                `reporter: ${this.reporter.getFullName()}\n` +
               (this.assignee ? `assignee: ${this.assignee.getFullName()}\n` : '');
    }

    isComposite(): boolean {
        return false;
    }
}