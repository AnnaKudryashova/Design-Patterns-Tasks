import { TaskComponent } from "../../core/tasks/TaskComponent";
import { TaskGroup } from "../../entities/composite/TaskGroup";

export function isTaskGroup(task: TaskComponent): task is TaskGroup {
    return task.isComposite?.() === true;
}
