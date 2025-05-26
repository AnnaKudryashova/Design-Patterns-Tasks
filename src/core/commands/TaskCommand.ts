export interface TaskCommand {
    execute(): void;
    undo(): void;
}