import { Task } from '../../../core/tasks/Task.interface';
import { User } from '../../../domain/entities/User';
import { TaskStatus } from '../../../shared/types/task.types';
// TaskGroup (Composite in Composite pattern)
export class TaskGroup implements Task {
    private tasks: Task[] = [];

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public reporter: User,
        public status: TaskStatus = 'TODO',
        public assignee?: User
    ) {}

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    removeTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    getDetails(): string {
        const taskDetails = this.tasks.map(task => task.getDetails()).join('\n');
        return `Group: ${this.title}\n${taskDetails}`;
    }
}