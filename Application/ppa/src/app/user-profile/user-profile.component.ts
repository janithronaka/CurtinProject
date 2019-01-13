import { Component, OnInit } from '@angular/core';
import { Membership } from './user-profile.model';
import { MembershipService } from './user-profile.service';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login-dashboard/login-form/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileList = [] as Membership[];
  sessionName: any;
  sessionID: any;
  mem_Name: any;
  NICnumber: any;
  dob: any;
  Nationality: any;
  Religion: any;
  civil: any;
  c_Count: any;
  c_Info: any;
  address: any;
  residentPhone: any;
  mobilePhone: any;
  email: any;
  occupation: any;
  degree = [] as any;
  otherQulification: any;
  id: any;
  validNum = true;
  admisionDate: any;
  formatsDateTest: string[] = [
    'yyyy-M-dd'
    ];

    addmissionNo: any;

  constructor(
    private membershipService: MembershipService,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
  // get user id from session
    this.sessionID = sessionStorage.getItem('id');

    this.membershipService.getMembershipByMemberId(this.sessionID).subscribe((data: any) => {
      // binding withe the text fields
      this.mem_Name = data.memberName;
      this.NICnumber = data.nicNo;
      this.dob = data.memberDob.substring(0, 10);
      this.Nationality = data.nationality;
      this.Religion = data.religion;
      this.civil = data.civilStatus;
      this.c_Count = data.childrenCount;
      this.c_Info = data.childrenInfo;
      this.address = data.homeAddress;
      this.residentPhone = data.homeTel;
      this.mobilePhone = data.mobileNo;
      this.email = data.personalEmail;
      this.occupation = data.memberOccup;
      this.degree = data.degreeDetails;
      this.otherQulification = data.otherQualif;
      this.id = data._id;
      this.admisionDate = data.addmisionDate;
      this.addmissionNo = data.addmissionNo;

      console.log(this.degree[0]);
    });
  }

  onEditProfie(form: NgForm) {
    // check mobile phone have 10 digitis
   if (this.mobilePhone.length != 10) {
      this.validNum = false;
      this.snackBar.open('Invalid mobile number', 'Close', {
        duration: 2000,
      });
   } else if (this.residentPhone.length != 10) { // check resident phone have 10 digits
     this.validNum = false;
     this.snackBar.open('Invalid telephone number', 'Close', {
      duration: 2000,
    });
   } else {
    // send form values to membership service script
    console.log(this.dob);
    this.membershipService.saveMembership(form.value);
    // update login details
    this.loginService.getLogin(this.sessionID).subscribe(( data: any) => {
    this.loginService.editLogin(this.sessionID, this.email, data.password, null);


    });



    // laod the form again
    this.snackBar.open('Successfully updated', 'Close', {
      duration: 2000,
    });
    this.ngOnInit();
  }
  }

 public reset_pass() {
  this.router.navigate(['/password-reset']);
 }


}
