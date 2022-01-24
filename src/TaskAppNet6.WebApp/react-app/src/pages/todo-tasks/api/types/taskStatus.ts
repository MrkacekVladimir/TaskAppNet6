export enum ToDoTaskStatus {
    Initial = 1,
    InProgress = 2,
    Completed = 3
}

export class ToDoTaskStatusHelper {
    static getName(status: ToDoTaskStatus): string {
        switch (status) {
            case ToDoTaskStatus.Initial:
                return "Initial";
            case ToDoTaskStatus.InProgress:
                return "In Progress";
            case ToDoTaskStatus.Completed:
                return "Completed";
            default:
                throw "Status has no description.";
        }
    }
}