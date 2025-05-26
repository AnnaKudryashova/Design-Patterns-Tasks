import { TaskComponent } from "../../core/tasks/TaskComponent";
import { User } from "../../entities/User";
import { SimpleTask } from "../composite/SimpleTask";


export class TaskFlyweightFactory {
    private static taskCache: Map<string, TaskComponent> = new Map();

    static getTask(id: string, title: string, description: string, reporter: User, assignee?: User): TaskComponent {
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