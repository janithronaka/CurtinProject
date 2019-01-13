import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {

  }

  getTasks(projectId) {
    return this.http.get<TaskModel[]>(`/api/tasks/${projectId}/all`);
  }
  getTask(taskId) {
    return this.http.get<TaskModel>(`/api/tasks/${taskId}`);
  }

  createTask(taskObj) {
    return this.http.post<TaskModel>(`/api/tasks`, taskObj);
  }
  updateTask(taskObj) {
    return this.http.put<TaskModel>(`/api/tasks/${taskObj.taskId}`, taskObj);
  }
  removeTask(taskObj) {
    return this.http.delete<TaskModel>(`/api/tasks/${taskObj.projectId}/${taskObj.taskId}`);
  }
  getNextTask() {
    return this.http.get<TaskModel>('api/tasks/latest');
  }
}
