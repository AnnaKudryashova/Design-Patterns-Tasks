import { User } from '../../domain/entities/User';
import { TaskStatus } from '../../shared/types/task.types';
// Task interface (Component in Composite pattern)
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    assignee?: User;
    reporter: User;
    getDetails(): string;
}