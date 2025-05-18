import { TaskObserver } from '../../../core/observers/TaskObserver.interface';
import { User } from '../../../domain/entities/User';
// Subject - TaskManager
export class TaskManager {
    private observers: TaskObserver[] = [];

    addObserver(observer: TaskObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: TaskObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(taskId: string, status: string, assignee?: User): void {
        this.observers.forEach(obs =>
            obs.update(taskId, status, assignee)
        );
    }
}