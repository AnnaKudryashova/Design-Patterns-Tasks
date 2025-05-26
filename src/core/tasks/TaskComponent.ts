import { User } from '../../entities/User';
import { TaskStatus } from '../../types/taskTypes';

export interface TaskComponent {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assignee?: User;
    reporter: User;
    getDetails(): string;
}