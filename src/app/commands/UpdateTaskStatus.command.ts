import { TaskCommand } from "../../core/commands/TaskCommand.interface";
import { Task } from "../../core/tasks/Task.interface";
import { TaskManager } from "../../features/task-management/services/TaskManager.service";
import { TaskStatus } from "../../shared/types/task.types";

export class UpdateTaskStatusCommand implements TaskCommand {
    private previousStatus: string;

    constructor(
        private task: Task,
        private newStatus: TaskStatus,
        private taskManager: TaskManager
    ) {
        this.previousStatus = task.status;
    }

    execute(): void {
        this.task.status = this.newStatus;
        this.taskManager.notifyObservers(this.task.id, this.newStatus);
    }

    undo(): void {
        this.task.status = this.previousStatus as TaskStatus;
        this.taskManager.notifyObservers(this.task.id, this.previousStatus);
    }
}