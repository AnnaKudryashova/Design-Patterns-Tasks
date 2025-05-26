import { TaskComponent } from '../../core/tasks/TaskComponent';
import { User } from '../../entities/User';
import { TaskStatus } from '../../types/taskTypes';

export class TaskGroup implements TaskComponent {
    private tasks: TaskComponent[] = [];

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public reporter: User,
        public status: TaskStatus = 'TODO',
        public assignee?: User
    ) {}

    addTask(task: TaskComponent): void {
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