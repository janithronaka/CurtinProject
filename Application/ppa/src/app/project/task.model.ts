export interface TaskModel {
    taskId: number;
    name: string;
    description: string;
    projectId: string;
    createdDate: string;
    budget: number;
    completed: boolean;
}
