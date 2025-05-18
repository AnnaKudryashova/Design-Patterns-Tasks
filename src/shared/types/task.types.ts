// shared/types/task.types.ts
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type UserRole = 'DEVELOPER' | 'MANAGER' | 'QA';

// Optional: Composite-related types
export interface TaskComponent {
    id: string;
    title: string;
    getDetails(): string;
}

// Optional: Observer event payload
export interface TaskUpdateEvent {
    taskId: string;
    newStatus: TaskStatus;
    timestamp: Date;
    assignedTo?: string;
}