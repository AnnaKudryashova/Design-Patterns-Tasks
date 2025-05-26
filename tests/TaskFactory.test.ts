import { TaskFactory } from '../src/features/factories/TaskFactory';
import { testUser } from './setup';

describe('TaskFactory', () => {
    test('should create a simple task', () => {
        const task = TaskFactory.createTask(
            'simple',
            'Test Task',
            'Test Description',
            testUser
        );

        expect(task).toBeDefined();
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Test Description');
        expect(task.reporter).toBe(testUser);
        expect(task.status).toBe('TODO');
    });

    test('should create a task group', () => {
        const group = TaskFactory.createTask(
            'group',
            'Test Group',
            'Test Description',
            testUser
        );

        expect(group).toBeDefined();
        expect(group.title).toBe('Test Group');
        expect(group.description).toBe('Test Description');
        expect(group.reporter).toBe(testUser);
        expect(group.status).toBe('TODO');
    });

    test('should throw error for invalid task type', () => {
        expect(() => {
            TaskFactory.createTask(
                'invalid' as any,
                'Test Task',
                'Test Description',
                testUser
            );
        }).toThrow('Invalid task type');
    });
});