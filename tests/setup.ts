import { User } from '../src/entities/User';
import { TaskFactory } from '../src/features/factories/TaskFactory';
import { TaskManager } from '../src/features/services/TaskManager.service';
import { TaskNotifier } from '../src/features/notifications/TaskNotifier';

export const testUser = new User('1', 'Test', 'User', 'test@example.com', 'DEVELOPER');
export const testManager = new User('2', 'Test', 'Manager', 'manager@example.com', 'MANAGER');

export const createTestTask = () => {
    return TaskFactory.createTask('simple', 'Test Task', 'Test Description', testUser);
};

export const createTestGroup = () => {
    return TaskFactory.createTask('group', 'Test Group', 'Test Group Description', testUser);
};

export const setupTaskManager = () => {
    const taskManager = new TaskManager();
    const emailNotifier = new TaskNotifier('Email');
    const slackNotifier = new TaskNotifier('Slack');

    taskManager.addObserver(emailNotifier);
    taskManager.addObserver(slackNotifier);

    return { taskManager, emailNotifier, slackNotifier };
};