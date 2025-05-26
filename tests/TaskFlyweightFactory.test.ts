import { TaskFlyweightFactory } from '../src/features/flyweights/TaskFlyweightFactory';
import { testUser } from './setup';

describe('TaskFlyweightFactory', () => {
    beforeEach(() => {
        TaskFlyweightFactory['taskCache'].clear();
    });

    test('should create new task when not in cache', () => {
        const task = TaskFlyweightFactory.getTask(
            'Test Task',
            'Test Description',
            testUser
        );

        expect(task).toBeDefined();
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Test Description');
        expect(TaskFlyweightFactory.getCacheSize()).toBe(1);
    });

    test('should return cached task when same title and description', () => {
        const task1 = TaskFlyweightFactory.getTask(
            'Test Task',
            'Test Description',
            testUser
        );

        const task2 = TaskFlyweightFactory.getTask(
            'Test Task',
            'Test Description',
            testUser
        );

        expect(task1).toBe(task2);
        expect(TaskFlyweightFactory.getCacheSize()).toBe(1);
    });

    test('should create new task when description differs', () => {
        const task1 = TaskFlyweightFactory.getTask(
            'Test Task',
            'Description 1',
            testUser
        );

        const task2 = TaskFlyweightFactory.getTask(
            'Test Task',
            'Description 2',
            testUser
        );

        expect(task1).not.toBe(task2);
        expect(TaskFlyweightFactory.getCacheSize()).toBe(2);
    });
});