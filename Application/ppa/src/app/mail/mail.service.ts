import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  sendEmail(mailObj) {
    return this.http.post<String>(`/api/mail`, mailObj);
  }
}
