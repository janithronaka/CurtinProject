import { Injectable } from '@angular/core';
import { RequestModel } from './request.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Injectable({providedIn: 'root'})
export class RequestService {
  private requestList: RequestModel[] = [];

  constructor (private http: HttpClient) {}

  getAllRequest() {
    return this.http.get('http://localhost:4200/api/request/all');
  }

  getMemRequest(memberID: any) {
    return this.http.get('http://localhost:4200/api/request/member/' + memberID);

  }

  addRequest( memberID: any, type: any, remark: any, expected_date: any) {

    const newRequest: RequestModel = {
      _id: null,
      memberID: memberID,
      type: type,
      remark: remark,
      expected_date: expected_date,
      progress: 'Pending'
    };
    console.log(newRequest);
   this.http.post<{ status: any, message: any }>('http://localhost:4200/api/request/', newRequest).subscribe();
   }

  editReq(requestObj: RequestModel) {
    this.http.put<{ status: any, message: any }>('http://localhost:4200/api/request/', requestObj).subscribe();
  }

  deleteReq(reqID: any) {
    this.http.delete('http://localhost:4200/api/request/' + reqID).subscribe();
    this.getAllRequest();
  }

  getPendingRqstCount() {
    return this.http.get('/api/request/count/new');
  }
}
