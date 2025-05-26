import { TaskComponent } from '../../core/tasks/TaskComponent';
import { User } from '../../entities/User';
import { TaskType } from '../../types/taskTypes';
import { IdGenerator } from '../../core/utils/IdGenerator';
import { SimpleTask } from '../../entities/composite/SimpleTask';
import { TaskGroup } from '../../entities/composite/TaskGroup';

export class TaskFactory {
    static createTask(
        type: TaskType,
        title: string,
        description: string,
        reporter: User,
        assignee?: User
    ): TaskComponent {
        const id = IdGenerator.generateId();
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