import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogModel } from './log.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(private http: HttpClient) {

  }
  getLogs() {
    return this.http.get<LogModel[]>(`/api/logs/`);
  }
}
