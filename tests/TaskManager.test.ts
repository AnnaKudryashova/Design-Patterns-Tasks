import { TaskManager } from '../src/features/services/TaskManager.service';
import { TaskNotifier } from '../src/features/notifications/TaskNotifier';
import { createTestTask, testManager } from './setup';

describe('TaskManager', () => {
    let taskManager: TaskManager;
    let emailNotifier: TaskNotifier;
    let slackNotifier: TaskNotifier;

    beforeEach(() => {
        taskManager = new TaskManager();
        emailNotifier = new TaskNotifier('Email');
        slackNotifier = new TaskNotifier('Slack');

        taskManager.addObserver(emailNotifier);
        taskManager.addObserver(slackNotifier);
    });

    test('should notify observers when task status changes', () => {
        const task = createTestTask();
        const spyEmail = jest.spyOn(emailNotifier, 'update');
        const spySlack = jest.spyOn(slackNotifier, 'update');

        taskManager.notifyObservers(task, 'IN_PROGRESS', testManager);

        expect(spyEmail).toHaveBeenCalled();
        expect(spySlack).toHaveBeenCalled();
    });

    test('should not notify removed observer', () => {
        const task = createTestTask();
        taskManager.removeObserver(emailNotifier);

        const spyEmail = jest.spyOn(emailNotifier, 'update');
        const spySlack = jest.spyOn(slackNotifier, 'update');

        taskManager.notifyObservers(task, 'IN_PROGRESS', testManager);

        expect(spyEmail).not.toHaveBeenCalled();
        expect(spySlack).toHaveBeenCalled();
    });
});