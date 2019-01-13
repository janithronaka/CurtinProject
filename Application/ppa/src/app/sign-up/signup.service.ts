import { Injectable } from '@angular/core';
import { Signup } from './signup.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({providedIn: 'root'})
export class SignupService {
  private requestList: Signup[] = [];

  constructor (private http: HttpClient) {}

  getMember(memID: any) {
    return this.http.get<{ status: any, message: any }>('http://localhost:4200/api/membership/member/' + memID);
  }

  addLogin( memberID: any, email: any, memberPass: any) {

    const newLogin: Signup = {
      _id: null,
      memberID: memberID,
      email: email,
      password: memberPass
    };

   this.http.post<{ status: any, message: any }>('http://localhost:4200/api/login/', newLogin).subscribe();
   }

  editReq(requestObj: Signup) {
    // this.http.put<{ status: any, message: any }>('http://localhost:4200/api/request/', requestObj).subscribe();
  }


}

