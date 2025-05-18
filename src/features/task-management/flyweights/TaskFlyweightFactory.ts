import { Task } from "../../../core/tasks/Task.interface";
import { User } from "../../../domain/entities/User";
import { SimpleTask } from "../models/SimpleTask.model";


export class TaskFlyweightFactory {
    private static taskCache: Map<string, Task> = new Map();

    static getTask(id: string, title: string, description: string, reporter: User, assignee?: User): Task {
        const key = `${title}-${description}`;

        if (!this.taskCache.has(key)) {
            this.taskCache.set(key, new SimpleTask(id, title, description, reporter));
        }

        return this.taskCache.get(key)!;
    }

    static getCacheSize(): number {
        return this.taskCache.size;
    }
}