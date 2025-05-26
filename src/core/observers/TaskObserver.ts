import { User } from "../../entities/User";
import { TaskStatus } from "../../types/taskTypes";
import { TaskComponent } from "../tasks/TaskComponent";

export interface TaskObserver {
    update(task: TaskComponent, status: TaskStatus, assignee?: User): void;
}