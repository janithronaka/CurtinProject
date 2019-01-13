import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectModel } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {

  }

  getProjects() {
    return this.http.get<ProjectModel[]>('/api/projects');
  }
  getProject(projectId) {
    return this.http.get<ProjectModel>(`/api/projects/${projectId}`);
  }

  createProject(projectObj) {
    return this.http.post<ProjectModel>(`/api/projects`, projectObj);
  }
  updateProject(projectObj) {
    return this.http.put<ProjectModel>(`/api/projects/${projectObj.projectId}`, projectObj);
  }

  getNextProject() {
    return this.http.get<ProjectModel>('api/projects/latest');
  }
}
