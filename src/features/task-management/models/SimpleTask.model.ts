import { Task } from '../../../core/tasks/Task.interface';
import { User } from '../../../domain/entities/User';
import { TaskStatus } from '../../../shared/types/task.types';
// SimpleTask (Leaf in Composite pattern)
export class SimpleTask implements Task {
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