import { Task } from './models/Task';
import { TaskNotifier, TaskManager } from './models/TaskObserver';
import { TaskFactory } from './models/TaskFactory';
import { TaskFlyweightFactory } from './models/TaskFlyweight';
import { TaskCommandInvoker, UpdateTaskStatusCommand, AssignTaskCommand } from './models/TaskCommand';

// Create task manager and observers
const taskManager = new TaskManager();
const emailNotifier = new TaskNotifier('Email');
const slackNotifier = new TaskNotifier('Slack');

taskManager.addObserver(emailNotifier);
taskManager.addObserver(slackNotifier);

// Create command invoker
const commandInvoker = new TaskCommandInvoker();

// Create tasks using Factory Method
const task1 = TaskFactory.createTask('simple', '1', 'Implement login', 'Create login functionality');
const task2 = TaskFactory.createTask('simple', '2', 'Add validation', 'Add form validation');
const sprint1 = TaskFactory.createTask('group', '3', 'Sprint 1', 'First sprint tasks') as Task;

// Use Flyweight pattern to create similar tasks
const task3 = TaskFlyweightFactory.getTask('4', 'Implement login', 'Create login functionality');
const task4 = TaskFlyweightFactory.getTask('5', 'Implement login', 'Create login functionality');

console.log('Flyweight cache size:', TaskFlyweightFactory.getCacheSize()); // Should be 1

// Use Command pattern to update task status
const updateStatusCommand = new UpdateTaskStatusCommand(task1, 'IN_PROGRESS', taskManager);
commandInvoker.executeCommand(updateStatusCommand);

// Use Command pattern to assign task
const assignCommand = new AssignTaskCommand(task1, 'John Doe', taskManager);
commandInvoker.executeCommand(assignCommand);

// Undo last command (unassign task)
commandInvoker.undoLastCommand();

// Print task details
console.log('\nTask Details:');
console.log(task1.getDetails());
console.log(task2.getDetails());
console.log(task3.getDetails());
console.log(task4.getDetails());

// flyweight factory creates a bunch of flyweight tasks (title + description is a key)
// add tasks to database (factory with intricicate states, unique parameters, as asignee, reporter, id, status)
// when adding to task database getFlyweight and on the flyweight call the method getInfo()
// should be a class User() that is a person from a team with name, surname