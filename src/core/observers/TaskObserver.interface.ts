import { User } from "../../domain/entities/User";
// Observer interface
export interface TaskObserver {
    update(taskId: string, status: string, assignee?: User): void;
}