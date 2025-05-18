import { TaskCommand } from "../../core/commands/TaskCommand.interface";

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