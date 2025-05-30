import { User } from "./entities/User";
import { TaskNotifier } from "./features/notifications/TaskNotifier";
import { TaskFactory } from "./features/factories/TaskFactory";
import { TaskFlyweightFactory } from "./features/flyweights/TaskFlyweightFactory";
import { TaskManager } from "./features/services/TaskManager.service";
import { AssignTaskCommand } from "./features/commands/AssignTaskCommand";
import { TaskCommandInvoker } from "./features/commands/TaskCommandInvoker";
import { UpdateTaskStatusCommand } from "./features/commands/UpdateTaskStatusCommand";
import { isTaskGroup } from "./features/utils/TaskUtils";

const tom = new User('1', 'Tom', 'Lee', 'tom_lee@test.com', 'DEVELOPER');
const jane = new User('2', 'Jane', 'Johnson', 'jane_johnson@test.com', 'MANAGER');

const taskManager = new TaskManager();
const emailNotifier = new TaskNotifier('Email');
const slackNotifier = new TaskNotifier('Slack');

taskManager.addObserver(emailNotifier);
taskManager.addObserver(slackNotifier);

const commandInvoker = new TaskCommandInvoker();

const task1 = TaskFactory.createTask('simple', 'Implement login', 'Create login functionality', jane);
const task2 = TaskFactory.createTask('simple', 'Add validation', 'Add form validation', jane);
const sprint1 = TaskFactory.createTask('group', 'Sprint 1', 'First sprint tasks', jane);

if (isTaskGroup(sprint1)) {
    sprint1.addTask(task1);
    sprint1.addTask(task2);
}

const task3 = TaskFlyweightFactory.getTask('Add unit tests', 'Create tests to cover new functionality', jane);
const task4 = TaskFlyweightFactory.getTask('Add unit tests', 'Create tests to cover new functionality', jane);

console.log('Flyweight cache size:', TaskFlyweightFactory.getCacheSize()); // Should be 1

const assignTask1 = new AssignTaskCommand(task1, tom, taskManager);
commandInvoker.executeCommand(assignTask1);

const updateStatusTask1 = new UpdateTaskStatusCommand(task1, 'IN_PROGRESS', taskManager);
commandInvoker.executeCommand(updateStatusTask1);

const assignTask2 = new AssignTaskCommand(task2, tom, taskManager);
commandInvoker.executeCommand(assignTask2);

commandInvoker.undoLastCommand();

console.log('\nSimple Tasks Details:\n');
console.log(task1.getDetails());
console.log(task2.getDetails());
console.log(task3.getDetails());
console.log(task4.getDetails());

console.log('\nGroup Details:\n');
console.log(sprint1.getDetails());
