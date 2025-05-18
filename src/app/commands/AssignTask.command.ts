
import { TaskCommand } from '../../core/commands/TaskCommand.interface';
import { Task } from '../../core/tasks/Task.interface';
import { User } from '../../domain/entities/User';
import { TaskManager } from '../../features/task-management/services/TaskManager.service';

export class AssignTaskCommand implements TaskCommand {
    private previousAssignee?: User;

    constructor(
        private task: Task,
        private newAssignee: User,
        private taskManager: TaskManager
    ) {
        this.previousAssignee = task.assignee;
    }

    execute(): void {
        this.task.assignee = this.newAssignee;
        this.taskManager.notifyObservers(
            this.task.id,
            this.task.status,
            this.newAssignee
        );
    }

    undo(): void {
        this.task.assignee = this.previousAssignee;
        this.taskManager.notifyObservers(
            this.task.id,
            this.task.status,
            this.previousAssignee
        );
    }
}