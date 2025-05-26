
import { TaskCommand } from '../../core/commands/TaskCommand';
import { TaskComponent } from '../../core/tasks/TaskComponent';
import { User } from '../../entities/User';
import { TaskManager } from '../services/TaskManager.service';

export class AssignTaskCommand implements TaskCommand {
    private previousAssignee?: User;

    constructor(
        private task: TaskComponent,
        private newAssignee: User,
        private taskManager: TaskManager
    ) {
        this.previousAssignee = task.assignee;
    }

    execute(): void {
        console.log('----------Assigning Task----------\n');
        this.task.assignee = this.newAssignee;
        this.taskManager.notifyObservers(
            this.task,
            this.task.status,
            this.newAssignee
        );
    }

    undo(): void {
        this.task.assignee = this.previousAssignee;
        this.taskManager.notifyObservers(
            this.task,
            this.task.status,
            this.previousAssignee
        );
    }
}