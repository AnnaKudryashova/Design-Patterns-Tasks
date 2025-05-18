import { Task, SimpleTask } from './Task';

export class TaskFlyweightFactory {
    private static taskCache: Map<string, Task> = new Map();

    static getTask(id: string, title: string, description: string): Task {
        const key = `${title}-${description}`;

        if (!this.taskCache.has(key)) {
            this.taskCache.set(key, new SimpleTask(id, title, description));
        }

        return this.taskCache.get(key)!;
    }

    static getCacheSize(): number {
        return this.taskCache.size;
    }
}