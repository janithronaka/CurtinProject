import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestService } from './request.service';
import { RequestModel } from './request.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-letter-request',
  templateUrl: './letter-request.component.html',
  styleUrls: ['./letter-request.component.css']
})
export class LetterRequestComponent implements OnInit {

  requestList = [] as RequestModel[];
  LetterForm: any;
  memberID: any;
  minDate: any =  new Date();
  expireDate: any = '';
  letter_type: any;
  Remark: any;
  needed_date: any;
  Select: any;
  reqID: any;
  submitBtnName: any = 'Add';
  disableDelete: any = true;
  sessionID: any;
  id = 'id';
  request = [] as any;
  arr_length: any;

  constructor(
    public requestService: RequestService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {

    this.sessionID = sessionStorage.getItem(this.id);
    this.memberID = this.sessionID;
    this.getRequest();

  }

  getRequest() {
    this.request = [];
   // this.requestService.getAllRequest().subscribe(( data:any) => {
     this.requestService.getAllRequest().subscribe((data: any) => {
       this.arr_length = data.length;

      if (data) {
        for (let i = 0; i < this.arr_length; i++) {
          if (data[i].memberID == this.memberID) {
            this.request.push(data[i]);
        }


          this.requestList = this.request;
        }

      }
    });
  }

  onAddRequest(form: NgForm) {
    if (form.invalid) {
      console.log(form.controls.exDate.value);
      return;
    }

    if (this.submitBtnName === 'Add') {
      // this.requestService.addRequest

      this.requestService.addRequest(this.sessionID, this.Select, this.Remark, this.expireDate);
      this.snackBar.open('Record successfully added', 'Close', {
        duration: 2000,
      });
    } else {
      const newReq: RequestModel = {
        _id: this.reqID,
        memberID: this.sessionID,
        type: this.Select,
        remark: this.Remark,
        expected_date: this.expireDate,
        progress: 'Pending'
      };
      this.requestService.editReq(newReq);
      this.snackBar.open('Record successfully updated', 'Close', {
        duration: 2000,
      });
    }
    this.getRequest();
  }

  onDelete() {
    this.request = [];
    this.requestService.deleteReq(this.reqID);
    this.snackBar.open('Record successfully deleted', 'Close', {
      duration: 2000,
    });

  }

  onCancel(form: NgForm) {
    this.submitBtnName = 'Save';
    this.expireDate = null;
    this.disableDelete = true;
    this.reqID = null;
    form.reset();
  }

  onEdit(requestObj: RequestModel) {
    this.submitBtnName = 'Edit';
    this.Select = requestObj.type;
    this.Remark = requestObj.remark;
    this.expireDate = requestObj.expected_date;
    this.reqID = requestObj._id;
    this.memberID = requestObj.memberID;
    this.disableDelete = false;


  }



}



