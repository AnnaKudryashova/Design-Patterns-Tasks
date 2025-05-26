import { TaskObserver } from '../../core/observers/TaskObserver';
import { TaskComponent } from '../../core/tasks/TaskComponent';
import { User } from '../../entities/User';
import { TaskStatus } from '../../types/taskTypes';
export class TaskNotifier implements TaskObserver {
    constructor(private name: string) {}

    update(
        task: TaskComponent, status: TaskStatus, assignee?: User
    ): void {
           const details = `Task "${task.title}" (ID: ${task.id})\n` +
                       `Status: ${task.status}\n` +
                       (task.assignee ? `Assignee: ${task.assignee.getFullName()}\n` : '') +
                       `Reporter: ${task.reporter.getFullName()}\n`;

        console.log(`[${this.name}] Notification:\n${details}`);
    }
}