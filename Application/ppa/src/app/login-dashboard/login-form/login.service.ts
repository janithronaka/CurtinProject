import { Injectable } from '@angular/core';
import { Login } from './login.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class LoginService {
  private loginList: Login[] = [];
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor (private http: HttpClient) {}

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  getLogin(memID: any) {
   // console.log('memID' + memID);
    return this.http.get<{ status: any, message: any }>('http://localhost:4200/api/login/' + memID);
  // console.log(val);
  // console.log(this.http.get('http://localhost:4200/api/login/' + memID));
  }

  getAllLogins() {
    return this.http.get<{ status: any, message: any }>('http://localhost:4200/api/login/all');
  }

  getMember(memID: any) {
    return this.http.get<{ status: any, message: any }>('http://localhost:4200/api/membership/member/' + memID);
  }

  addLogin( memberID: any, email: any, memberPass: any) {

    const newLogin: Login = {
      memberID: memberID,
      email: email,
      password: memberPass,
      code: null
    };
    console.log(newLogin);
   this.http.post<{ status: any, message: any }>('http://localhost:4200/api/login/', newLogin).subscribe();
   }

   editLogin( memberID: any, email: any, memberPass: any, code: any) {
     const newEdit: Login = {
       memberID: memberID,
       email: email,
       password: memberPass,
       code: code
     };
     this.http.put<{ status: any, message: any }>('http://localhost:4200/api/login/' + memberID , newEdit).subscribe();

   }



}
