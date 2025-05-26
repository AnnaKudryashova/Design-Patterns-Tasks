import { TaskObserver } from '../../core/observers/TaskObserver';
import { TaskComponent } from '../../core/tasks/TaskComponent';
import { User } from '../../entities/User';
import { TaskStatus } from '../../types/taskTypes';

export class TaskManager {
    private observers: TaskObserver[] = [];

    addObserver(observer: TaskObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: TaskObserver): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(task: TaskComponent, status: TaskStatus, assignee?: User): void {
        this.observers.forEach(obs =>
            obs.update(task, status, assignee)
        );
    }
}