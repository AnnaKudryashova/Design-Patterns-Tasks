import { TaskComponent } from '../../core/tasks/TaskComponent';
import { User } from '../../entities/User';
import { TaskType } from '../../types/taskTypes';
import { SimpleTask } from '../composite/SimpleTask';
import { TaskGroup } from '../composite/TaskGroup';

export class TaskFactory {
    static createTask(
        type: TaskType,
        id: string,
        title: string,
        description: string,
        reporter: User,
        assignee?: User
    ): TaskComponent {
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