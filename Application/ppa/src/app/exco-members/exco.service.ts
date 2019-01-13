import { Injectable } from '@angular/core';
import { ExcoModel } from './exco.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ExcoService {
  private requestList: ExcoModel[] = [];

  constructor (private http: HttpClient) {}

  getAllExco() {
    return this.http.get('http://localhost:4200/api/exco/all');
  }

  getExcoByDate(date_from: any, date_to: any) {
    return this.http.get('http://localhost:4200/api/exco/date/' + date_from + '/' + date_to);

  }

  addExco( date_from: any, date_to: any, memberID: any, position: any, memberName: any, mobileNo: any) {

    const newRequest: ExcoModel = {
      _id: null,
      date_from: date_from,
      date_to: date_to,
      memberID: memberID,
      position: position,
      memberName: memberName,
      mobileNo: mobileNo
    };

   this.http.post<{ status: any, message: any }>('http://localhost:4200/api/exco/', newRequest).subscribe();
   }

  ediExco(requestObj: ExcoModel) {
    this.http.put<{ status: any, message: any }>('http://localhost:4200/api/exco/', requestObj).subscribe();
  }

  deleteExco(id: any) {
    this.http.delete('http://localhost:4200/api/exco/' + id).subscribe();
    this.getAllExco();
  }

  getById(id: any) {
    return this.http.get('http://localhost:4200/api/exco/member/' + id);
  }

  getByMemId(id: any) {
    return this.http.get('http://localhost:4200/api/exco/memberById/' + id);
  }

}
