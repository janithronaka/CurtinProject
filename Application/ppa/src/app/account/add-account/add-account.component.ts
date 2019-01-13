import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../account.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AccountService } from '../account.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  selectedValue: string;
  mode = 'new';
  loading = false;
  isSave = false;
  formTitle = 'Add new Account';
  updatingAcc: AccountModel;
  accountId: string;
  states: any[] = [
    {value: 'Open', viewValue: 'Open'},
    {value: 'Close', viewValue: 'Close'}
  ];
  selected = 'Open';
  public accountService: AccountService;
  form: FormGroup;


  constructor(accountService: AccountService, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.accountService = accountService;
  }

  onSaveAccount(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }
    this.isSave = true;
    if (this.mode === 'new') {
      this.accountService.addAccount(this.form.value.accId, this.form.value.desc, this.form.value.status).subscribe((accountData: any) => {
        this.openSnackBar(accountData.message, null);
        this.isSave = false;
      });
      formDirective.resetForm();
      this.form.reset();
    } else {
      this.accountService.updateAccount(this.accountId, this.form.value.desc, this.form.value.status)
      .subscribe((accountData: any) => {
        this.openSnackBar(accountData.message, null);
        this.isSave = false;
      });
    }
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action ? 'Action Label' : 'Hide', {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      accId: new FormControl(null, {
        validators: []
      }),
      desc: new FormControl(null, { validators: [Validators.required]}),
      status: new FormControl(null, { validators: [Validators.required]})
    });
    this.form.get('status').setValue('Open');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('accountId')) {
        this.mode = 'update';
        this.formTitle = 'Update Account';
        this.accountId = paramMap.get('accountId');
        this.loading = true;
        this.accountService.getAccount(this.accountId).subscribe(accountData => {
          this.updatingAcc = {
            id: accountData.documents._id,
            accId: accountData.documents.accId,
            desc: accountData.documents.desc,
            status: accountData.documents.status
          };
          this.form.setValue({
            accId: this.updatingAcc.accId,
            desc: this.updatingAcc.desc,
            status: this.updatingAcc.status
          });
          this.form.controls['accId'].setValidators([]);
          this.form.get('accId').disable();
          this.loading = false;
        });

      } else {
        this.mode = 'new';
        this.formTitle = 'Add new Account';
        this.accountId = null;
        this.form.controls['accId'].setValidators([Validators.required]);
        this.form.get('accId').enable();
      }
    });
  }
}
