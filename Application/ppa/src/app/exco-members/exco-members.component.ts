import { Component, OnInit } from '@angular/core';
import { ExcoModel } from './exco.model';
import { MembershipService } from '../new-membership/membership/membership.service';
import { NgForm } from '@angular/forms';
import { ExcoService } from './exco.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-exco-members',
  templateUrl: './exco-members.component.html',
  styleUrls: ['./exco-members.component.css']
})

export class ExcoMembersComponent implements OnInit {

  private exco: ExcoModel[] = [];
  private displayedColumns: string[] = ['memberID', 'memberName', 'mobileNo', 'position', 'date_from', 'date_to', 'action'];
  minDate: any =  new Date();
  memberID: any;
  position_select: any;
  memberName: any;
  mobilePhone: any;
  date_form: any;
  date_to: any;
  reqID: any;
  yearPresident = [] as any;
  yearsecretary = [] as any;
  yearaccountent = [] as any;
  yearadmin = [] as any;
  thisYear: string;
  crrYear = Date();
  filterString = '';
  checkMemID: any;

  constructor(
    private memberService: MembershipService,
    private excoService: ExcoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getMember();
  }

  getMember() {
    this.excoService.getAllExco().subscribe((data: any) => {
      console.log(data);
      this.exco = data;

      this.yearsecretary = [];
        this.yearaccountent = [];
        this.yearadmin = [];
        this.yearPresident = [];

      for (let i = 0; i < data.length; i++) {
        this.thisYear = (data[i].date_from);

        console.log(this.crrYear);

        if (this.thisYear.substr(0, 4) == this.crrYear.substr(11, 4)) {
          if (data[i].position == 'President') {
            this.yearPresident.push(data[i].memberName + ',  ');
          }

          if (data[i].position == 'Accountent') {
            this.yearaccountent.push(data[i].memberName + ',  ');
          }

          if (data[i].position == 'Secretary') {
            this.yearsecretary.push(data[i].memberName + ',  ');
          }

          if (data[i].position == 'Admin') {
            this.yearadmin.push(data[i].memberName + ',  ');
          }
        }
      }


    });
     // this.members = data;

  }

  addComittee(form: NgForm) {

   this.date_to = form.value.to;
   this.memberID = form.value.MemID;
   this.position_select = form.value.position;
   this.memberName = form.value.Mname;
   this.mobilePhone = form.value.mobiPhone;

  this.excoService.getByMemId(this.memberID).subscribe((data: any) => {

    if (!data) {
      this.excoService.addExco(this.date_form, this.date_to, this.memberID, this.position_select, this.memberName, this.mobilePhone);
      this.getMember();
    } else {
            console.log(this.checkMemID + 'checkmem');
            console.log(this.memberID + 'this mem');
            console.log(data.date_from.substr(0, 4) + 'database');
            console.log(this.crrYear.substr(11, 4) + 'database');

      if ( data.memberID == this.memberID && data.date_from.substr(0, 4) == this.crrYear.substr(11, 4)) {
          this.snackBar.open('Member alredy have a position', 'Close', {
          duration: 2000,
        });
      } else {
          this.excoService.addExco(this.date_form, this.date_to, this.memberID, this.position_select, this.memberName, this.mobilePhone);
          this.getMember();
      }
  }
  });

  // this.excoService.addExco(this.date_form, this.date_to, this.memberID, this.position_select, this.memberName, this.mobilePhone);

  }

  getData() {
    this.memberService.getMembershipByMemberId(this.memberID).subscribe((data: any) => {
      this.memberName = data.memberName;
      this.mobilePhone = data.mobileNo;
    });
  }

  onEdit() {
    const excoObj: ExcoModel = {
      _id: this.reqID,
      date_from: this.date_form,
      date_to: this.date_to,
      memberID: this.memberID,
      position: this.position_select,
      memberName: this.memberName,
      mobileNo: this.mobilePhone
    }

    this.excoService.ediExco(excoObj);
    this.ngOnInit();
  }

  onDelete() {
    this.excoService.deleteExco(this.reqID);
    this.ngOnInit();
  }

  getfrombtnEdit(id) {

      this.excoService.getById(id).subscribe((data: any) => {
      this.reqID = data._id;
      this.date_form = data.date_from;
      this.date_to = data.date_to;
      this.memberID = data.memberID;
      this.position_select = data.position;
      this.memberName = data.memberName;
      this.mobilePhone = data.mobileNo;

    });
  }


}
