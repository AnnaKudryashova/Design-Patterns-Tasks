// Task interface (Component in Composite pattern)
export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    assignee?: string;
    getDetails(): string;
}

// SimpleTask (Leaf in Composite pattern)
export class SimpleTask implements Task {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public status: 'TODO' | 'IN_PROGRESS' | 'DONE' = 'TODO',
        public assignee?: string
    ) {}

    getDetails(): string {
        return `Task: ${this.title} - ${this.status}`;
    }
}

// TaskGroup (Composite in Composite pattern)
export class TaskGroup implements Task {
    private tasks: Task[] = [];

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public status: 'TODO' | 'IN_PROGRESS' | 'DONE' = 'TODO',
        public assignee?: string
    ) {}

    addTask(task: Task): void {
        this.tasks.push(task);
    }

    removeTask(taskId: string): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    getDetails(): string {
        const taskDetails = this.tasks.map(task => task.getDetails()).join('\n');
        return `Group: ${this.title}\n${taskDetails}`;
    }
} 