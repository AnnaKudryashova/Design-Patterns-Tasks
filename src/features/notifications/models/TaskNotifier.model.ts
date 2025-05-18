import { TaskObserver } from '../../../core/observers/TaskObserver.interface';
import { User } from '../../../domain/entities/User';
// Concrete Observer - TaskNotifier
export class TaskNotifier implements TaskObserver {
    constructor(private name: string) {}

    update(
        taskId: string,
        status: string,
        assignee?: User
    ): void {
        console.log(`[${this.name}] Task ${taskId} status changed to ${status}` +
                   (assignee ? ` (Assigned: ${assignee.getFullName()})` : ''));
    }
}