import { Task } from './Task';
import { TaskManager } from './TaskObserver';

// Command interface
export interface TaskCommand {
    execute(): void;
    undo(): void;
}

// Concrete commands
export class UpdateTaskStatusCommand implements TaskCommand {
    private previousStatus: string;

    constructor(
        private task: Task,
        private newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE',
        private taskManager: TaskManager
    ) {
        this.previousStatus = task.status;
    }

    execute(): void {
        this.task.status = this.newStatus;
        this.taskManager.notifyObservers(this.task.id, this.newStatus);
    }

    undo(): void {
        this.task.status = this.previousStatus as 'TODO' | 'IN_PROGRESS' | 'DONE';
        this.taskManager.notifyObservers(this.task.id, this.previousStatus);
    }
}

export class AssignTaskCommand implements TaskCommand {
    private previousAssignee?: string;

    constructor(
        private task: Task,
        private newAssignee: string,
        private taskManager: TaskManager
    ) {
        this.previousAssignee = task.assignee;
    }

    execute(): void {
        this.task.assignee = this.newAssignee;
        this.taskManager.notifyObservers(this.task.id, this.task.status, this.newAssignee);
    }

    undo(): void {
        this.task.assignee = this.previousAssignee;
        this.taskManager.notifyObservers(this.task.id, this.task.status, this.previousAssignee);
    }
}

// Command invoker
export class TaskCommandInvoker {
    private commandHistory: TaskCommand[] = [];

    executeCommand(command: TaskCommand): void {
        command.execute();
        this.commandHistory.push(command);
    }

    undoLastCommand(): void {
        const command = this.commandHistory.pop();
        if (command) {
            command.undo();
        }
    }
} 