import { UserRole } from "../../shared/types/task.types";

export class User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public role: UserRole
    ) {}

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}