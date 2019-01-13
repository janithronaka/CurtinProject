import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  // get the email object send by fron end and post it to api
  sendEmail(mailObj) {
    console.log(mailObj);
    return this.http.post<String>(`/api/mail`, mailObj);
  }
}
