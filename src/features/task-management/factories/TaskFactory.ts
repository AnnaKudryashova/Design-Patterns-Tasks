import { Task } from '../../../core/tasks/Task.interface';
import { User } from '../../../domain/entities/User';
import { SimpleTask } from '../models/SimpleTask.model';
import { TaskGroup } from '../models/TaskGroup.model';

export class TaskFactory {
    static createTask(
        type: 'simple' | 'group',
        id: string,
        title: string,
        description: string,
        reporter: User,
        assignee?: User
    ): Task {
        switch (type) {
            case 'simple':
                return new SimpleTask(id, title, description, reporter, 'TODO', assignee);
            case 'group':
                return new TaskGroup(id, title, description, reporter, 'TODO', assignee);
            default:
                throw new Error('Invalid task type');
        }
    }
}