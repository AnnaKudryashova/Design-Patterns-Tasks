import { TaskCommand } from "../../core/commands/TaskCommand";
import { TaskComponent } from "../../core/tasks/TaskComponent";
import { TaskManager } from "../services/TaskManager.service";
import { TaskStatus } from "../../types/taskTypes";

export class UpdateTaskStatusCommand implements TaskCommand {
    private previousStatus: TaskStatus;

    constructor(
        private task: TaskComponent,
        private newStatus: TaskStatus,
        private taskManager: TaskManager
    ) {
        this.previousStatus = task.status;
    }

    execute(): void {
        console.log('\n----------Updating Status----------\n');
        this.task.status = this.newStatus;
        this.taskManager.notifyObservers(this.task, this.newStatus);
    }

    undo(): void {
        this.task.status = this.previousStatus as TaskStatus;
        this.taskManager.notifyObservers(this.task, this.previousStatus);
    }
}