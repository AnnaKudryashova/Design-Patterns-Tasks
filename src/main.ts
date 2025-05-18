import { User } from "./domain/entities/User";
import { TaskNotifier } from "./features/notifications/models/TaskNotifier.model";
import { TaskFactory } from "./features/task-management/factories/TaskFactory";
import { TaskFlyweightFactory } from "./features/task-management/flyweights/TaskFlyweightFactory";
import { TaskManager } from "./features/task-management/services/TaskManager.service";
import { AssignTaskCommand } from "./app/commands/AssignTask.command";
import { TaskCommandInvoker } from "./app/commands/TaskCommandInvoker";
import { UpdateTaskStatusCommand } from "./app/commands/UpdateTaskStatus.command";

// Create users
const john = new User('1', 'John', 'Doe', 'john@example.com', 'DEVELOPER');
const jane = new User('2', 'Jane', 'Smith', 'jane@example.com', 'MANAGER');

// Create task manager and observers
const taskManager = new TaskManager();
const emailNotifier = new TaskNotifier('Email');
const slackNotifier = new TaskNotifier('Slack');

taskManager.addObserver(emailNotifier);
taskManager.addObserver(slackNotifier);

// Create command invoker
const commandInvoker = new TaskCommandInvoker();

// Create tasks using Factory Method
const task1 = TaskFactory.createTask('simple', '1', 'Implement login', 'Create login functionality', jane);
const task2 = TaskFactory.createTask('simple', '2', 'Add validation', 'Add form validation', jane);
const sprint1 = TaskFactory.createTask('group', '3', 'Sprint 1', 'First sprint tasks', jane);

// Use Flyweight pattern to create similar tasks
const task3 = TaskFlyweightFactory.getTask('4', 'Implement login', 'Create login functionality', jane);
const task4 = TaskFlyweightFactory.getTask('5', 'Implement login', 'Create login functionality', jane);

console.log('Flyweight cache size:', TaskFlyweightFactory.getCacheSize()); // Should be 1

// Use Command pattern to update task status
const updateStatusCommand = new UpdateTaskStatusCommand(task1, 'IN_PROGRESS', taskManager);
commandInvoker.executeCommand(updateStatusCommand);

// Use Command pattern to assign task
const assignCommand = new AssignTaskCommand(task1, john, taskManager);
commandInvoker.executeCommand(assignCommand);

// Undo last command (unassign task)
commandInvoker.undoLastCommand();

// Print task details
console.log('\nTask Details:');
console.log(task1.getDetails());
console.log(task2.getDetails());
console.log(task3.getDetails());
console.log(task4.getDetails());