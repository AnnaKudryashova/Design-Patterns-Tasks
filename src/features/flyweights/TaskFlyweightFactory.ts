import { TaskComponent } from "../../core/tasks/TaskComponent";
import { User } from "../../entities/User";
import { IdGenerator } from "../../core/utils/IdGenerator";
import { SimpleTask } from "../../entities/composite/SimpleTask";

export class TaskFlyweightFactory {
    private static taskCache: Map<string, TaskComponent> = new Map();

    static getTask(title: string, description: string, reporter: User, assignee?: User): TaskComponent {
        const key = `${title}-${description}`;

        if (!this.taskCache.has(key)) {
            const id = IdGenerator.generateId();
            this.taskCache.set(key, new SimpleTask(id, title, description, reporter));
        }

        return this.taskCache.get(key)!;
    }

    static getCacheSize(): number {
        return this.taskCache.size;
    }
}