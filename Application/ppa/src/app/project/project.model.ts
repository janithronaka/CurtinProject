import { TaskModel } from "./task.model";

export interface ProjectModel {
  projectId: string;
  name: string;
  description: string;
  status: string;
  startingDate: Date;
  budget: number;
  tasks: TaskModel[];
}