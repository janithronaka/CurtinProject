import { Component, OnInit } from '@angular/core';
import { TransactionModel } from '../transaction.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TransactionService } from '../transaction.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  selectedValue: string;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  userId = 'USER';
  mode = 'new';
  loading = false;
  formTitle = 'Add new Transaction';
  updatingTra: TransactionModel;
  accountId: string;
  autoList: string[];
  transactionId: string;
  donations: any[] = [
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'}
  ];
  selected = 'No';
  isSave = false;
  public transactionService: TransactionService;
  form: FormGroup;
  fetchingStarted = false;
  accountsFetched = false;

  constructor(transactionService: TransactionService, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.transactionService = transactionService;
  }

  onSaveTransaction(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }
    if (this.form.value.donation === 'Yes' && this.form.value.amount < 0) {
      this.form.get('amount').setErrors({'incorrect': true});
      this.form.get('amount').markAsTouched();
      this.openSnackBar('Error: Cannot enter negative amount as donation.', null);
      return;
    }
    if (this.form.value.amount === 0) {
      this.form.get('amount').setErrors({'incorrect': true});
      this.form.get('amount').markAsTouched();
      this.openSnackBar('Error: Amount cannot be equal to zero.', null);
      return;
    }
    this.isSave = true;
    if (this.mode === 'new') {
      this.transactionService
      .addTransaction(this.form.value.accId, this.form.value.amount, this.form.value.desc, this.userId, this.form.value.donation)
      .subscribe((transactionData: any) => {
        this.openSnackBar(transactionData.message, null);
        this.isSave = false;
        formDirective.resetForm();
        this.form.reset();
        this.refreshFilter();
      }, err => {
        this.isSave = false;
        if (err.error.message) {
          this.openSnackBar(err.error.message, null);
        } else {
          this.openSnackBar(err.message, null);
        }
      });
    } else {
      this.transactionService
      .updateTransaction
      (this.transactionId, this.form.value.accId, this.form.value.amount, this.form.value.desc, this.userId, this.form.value.donation)
      .subscribe((transactionData: any) => {
        this.isSave = false;
        this.openSnackBar(transactionData.message, null);
      }, err => {
        this.isSave = false;
        if (err.error.message) {
          this.openSnackBar(err.error.message, null);
        } else {
          this.openSnackBar(err.message, null);
        }
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
      amount: new FormControl(null, { validators: [Validators.required]}),
      desc: new FormControl(null, { validators: [Validators.required]}),
      donation: new FormControl(null, { validators: [Validators.required]})
    });
    this.form.get('donation').setValue('No');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('transactionId')) {
        this.mode = 'update';
        this.formTitle = 'Update Transaction';
        this.transactionId = paramMap.get('transactionId');
        this.loading = true;
        this.transactionService.getTransaction(this.transactionId).subscribe(transactionData => {
          this.updatingTra = {
            id: transactionData.documents._id,
            accId: transactionData.documents.accId,
            amount: transactionData.documents.amount,
            desc: transactionData.documents.desc,
            entered: transactionData.documents.entered,
            date: transactionData.documents.date,
            donation: transactionData.documents.donation
          };
          this.form.setValue({
            accId: this.updatingTra.accId,
            amount: this.updatingTra.amount,
            desc: this.updatingTra.desc,
            donation: this.updatingTra.donation
          });
          this.form.controls['accId'].setValidators([]);
          this.form.get('accId').disable();
          this.loading = false;
        });

      } else if (paramMap.has('accountId')) {
        this.mode = 'new';
        this.formTitle = 'Add new Transaction';
        this.accountId = paramMap.get('accountId');
        this.transactionId = null;
        this.form.controls['accId'].setValidators([Validators.required]);
        this.form.get('accId').enable();
        this.form.setValue({
          accId: this.accountId,
          amount: null,
          desc: null,
          donation: 'No'
        });
      } else {
        this.mode = 'new';
        this.formTitle = 'Add new Transaction';
        this.transactionId = null;
        this.form.controls['accId'].setValidators([Validators.required]);
        this.form.get('accId').enable();
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onAccountFocused() {
    if (!this.fetchingStarted && !this.accountsFetched) {
      this.fetchingStarted = true;
      this.transactionService.getAccountIdList().subscribe(accData => {
        this.accountsFetched = true;
        this.options = accData.documents.names.slice();
        this.filteredOptions = this.form.controls['accId'].valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      });
    }
  }

  refreshFilter() {
    this.filteredOptions = this.form.controls['accId'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
}
