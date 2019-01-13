import { Component, OnInit } from '@angular/core';
import { Membership } from '../membership/membership.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MembershipService } from '../membership/membership.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-dir-detail',
  templateUrl: './member-dir-detail.component.html',
  styleUrls: ['./member-dir-detail.component.css']
})
export class MemberDirDetailComponent implements OnInit {
  selectedValue: string;
  router;
  mode = 'new';
  loading = false;
  isSave = false;
  formTitle = 'Member Detail';
  updatingAcc: any;
  accountId: string;
  states: any[] = [
    {value: 'Open', viewValue: 'Open'},
    {value: 'Close', viewValue: 'Close'}
  ];
  selected = 'Open';
  public membershipService: MembershipService;
  form: FormGroup;


  constructor(membershipService: MembershipService, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.membershipService = membershipService;
  }

  onSaveAccount(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }
     this.isSave = true;
     const accountData = {
      'preName': this.form.value.preName,
      'religion': this.form.value.religion,
      'nationality': this.form.value.nationality,
      'mobileNo': this.form.value.mobileNo,
      'personalEmail': this.form.value.personalEmail
    };
     this.membershipService.updateMemberAccount(accountData).subscribe((updata: any) => {
       this.openSnackBar('Task Completed', null);
       this.isSave = false;
     });
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action ? 'Action Label' : 'Hide', {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      memberName: new FormControl(null, {
        validators: []
      }),
      preName: new FormControl(null, {
        validators: []
      }),
      memberDob: new FormControl(null, {
        validators: []
      }),
      religion: new FormControl(null, {
        validators: []
      }),
      nationality: new FormControl(null, {
        validators: []
      }),
      addmisionDate: new FormControl(null, {
        validators: []
      }),
      leavingDate: new FormControl(null, {
        validators: []
      }),
      mobileNo: new FormControl(null, {
        validators: []
      }),
      personalEmail: new FormControl(null, {
        validators: []
      }),
      nicNo: new FormControl(null, { validators: [Validators.required]}),
      addmissionNo: new FormControl(null, { validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('memberId')) {
        this.mode = 'update';
        this.formTitle = 'Member Detail';
        this.accountId = paramMap.get('memberId');
        this.loading = true;
        this.membershipService.getMembershipByObjId(this.accountId).subscribe(accountData => {
          const json_data = JSON.stringify(accountData);
          const aadat = JSON.parse(json_data);
          this.updatingAcc = {
            _id: aadat._id,
            memberName: aadat.memberName,
            preferredName: aadat.preferredName,
            memberDob: aadat.memberDob,
            nationality: aadat.nationality,
            religion: aadat.religion,
            addmisionDate: aadat.addmisionDate,
            leavingDate: aadat.leavingDate,
            mobileNo: aadat.mobileNo,
            personalEmail: aadat.personalEmail,
            nicNo: aadat.nicNo,
            addmissionNo: aadat.addmissionNo
          };
          this.form.setValue({
            memberName: this.updatingAcc.memberName,
            preName: this.updatingAcc.preferredName,
            nicNo: this.updatingAcc.nicNo,
            memberDob: this.updatingAcc.memberDob,
            nationality: this.updatingAcc.nationality,
            religion: this.updatingAcc.religion,
            addmisionDate: this.updatingAcc.addmisionDate,
            leavingDate: this.updatingAcc.leavingDate,
            mobileNo: this.updatingAcc.mobileNo,
            personalEmail: this.updatingAcc.personalEmail,
            addmissionNo: this.updatingAcc.addmissionNo
          });
          this.form.controls['memberName'].setValidators([]);
          this.form.get('memberName').disable();
          this.loading = false;
        });

      } else {
        this.router = Router;
        this.router.parent.navigate(['/member-dir']);
      }
    });
  }
}
