import { Task, SimpleTask, TaskGroup } from './Task';

// Creator interface
export interface TaskCreator {
    createTask(id: string, title: string, description: string): Task;
}

// Concrete creators
export class SimpleTaskCreator implements TaskCreator {
    createTask(id: string, title: string, description: string): Task {
        return new SimpleTask(id, title, description);
    }
}

export class TaskGroupCreator implements TaskCreator {
    createTask(id: string, title: string, description: string): Task {
        return new TaskGroup(id, title, description);
    }
}

// Factory method
export class TaskFactory {
    static createTask(type: 'simple' | 'group', id: string, title: string, description: string): Task {
        let creator: TaskCreator;
        
        switch (type) {
            case 'simple':
                creator = new SimpleTaskCreator();
                break;
            case 'group':
                creator = new TaskGroupCreator();
                break;
            default:
                throw new Error('Invalid task type');
        }
        
        return creator.createTask(id, title, description);
    }
} 