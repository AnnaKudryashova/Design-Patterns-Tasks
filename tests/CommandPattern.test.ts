import { TaskCommandInvoker } from '../src/features/commands/TaskCommandInvoker';
import { AssignTaskCommand } from '../src/features/commands/AssignTaskCommand';
import { UpdateTaskStatusCommand } from '../src/features/commands/UpdateTaskStatusCommand';
import { createTestTask, testUser, testManager } from './setup';
import { TaskManager } from '../src/features/services/TaskManager.service';

describe('Command Pattern', () => {
    let commandInvoker: TaskCommandInvoker;
    let taskManager: TaskManager;

    beforeEach(() => {
        commandInvoker = new TaskCommandInvoker();
        taskManager = new TaskManager();
    });

    test('should execute assign task command', () => {
        const task = createTestTask();
        const command = new AssignTaskCommand(task, testManager, taskManager);

        commandInvoker.executeCommand(command);

        expect(task.assignee).toBe(testManager);
    });

    test('should execute update status command', () => {
        const task = createTestTask();
        const command = new UpdateTaskStatusCommand(task, 'IN_PROGRESS', taskManager);

        commandInvoker.executeCommand(command);

        expect(task.status).toBe('IN_PROGRESS');
    });

    test('should undo last command', () => {
        const task = createTestTask();
        const assignCommand = new AssignTaskCommand(task, testManager, taskManager);
        const updateCommand = new UpdateTaskStatusCommand(task, 'IN_PROGRESS', taskManager);

        commandInvoker.executeCommand(assignCommand);
        commandInvoker.executeCommand(updateCommand);
        commandInvoker.undoLastCommand();

        expect(task.status).toBe('TODO');
        expect(task.assignee).toBe(testManager);
    });
}); 