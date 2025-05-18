// Observer interface
export interface TaskObserver {
    update(taskId: string, status: string, assignee?: string): void;
}

// Concrete Observer - TaskNotifier
export class TaskNotifier implements TaskObserver {
    constructor(private name: string) {}

    update(taskId: string, status: string, assignee?: string): void {
        console.log(`[${this.name}] Task ${taskId} status changed to ${status}`);
        if (assignee) {
            console.log(`[${this.name}] Task ${taskId} assigned to ${assignee}`);
        }
    }
}

// Subject - TaskManager
export class TaskManager {
    private observers: TaskObserver[] = [];

    addObserver(observer: TaskObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: TaskObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(taskId: string, status: string, assignee?: string): void {
        this.observers.forEach(observer => {
            observer.update(taskId, status, assignee);
        });
    }
} 