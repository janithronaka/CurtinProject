import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionModel } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { Subscription } from 'rxjs';
import { PageEvent, MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit, OnDestroy {
  dtp1 = new FormControl();
  dtp2 = new FormControl();
  filters: any[] = [
    {value: 'All', viewValue: 'All'},
    {value: 'Account', viewValue: 'Account'}
  ];
  accountId: string;
  totalTransactions = 0;
  transactionsPerPage = 15;
  currPage = 1;
  loading = false;
  pageSizeOption = [15, 30, 50, 100];
  transactionData: TransactionModel[] = [];
  public transactionService: TransactionService;
  private subs: Subscription;
  displayedColumns: string[] = ['accId', 'amount', 'desc', 'entered', 'date', 'donation', 'actionsColumn'];
  dataSource = this.transactionData;
  selectedRowIndex = -1;
  formTitle = 'Transactions';
  filterString = '';
  filterOption = 'all';

  constructor(transactionService: TransactionService, public snackBar: MatSnackBar, public route: ActivatedRoute) {
    this.transactionService = transactionService;
  }

  ngOnInit(): void {
    this.dtp1.disable();
    this.dtp2.disable();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('accountId')) {
        this.accountId = paramMap.get('accountId');
        this.formTitle = 'Transactions - ' + this.accountId;
      } else {
        this.accountId = null;
        this.formTitle = 'Transactions';
      }
    });
    this.loading = true;
    this.transactionService
    .getTransactions(this.transactionsPerPage, 1, this.accountId, this.filterOption, this.filterString, this.dtp1.value, this.dtp2.value);
    this.subs = this.transactionService.getListUpdateListener()
      .subscribe((transactionData: {transactionData: TransactionModel[], transactionCount: number}) => {
      this.loading = false;
      this.transactionData = transactionData.transactionData;
      this.totalTransactions = transactionData.transactionCount;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onPageChanged(pageData: PageEvent) {
    this.loading = true;
    this.currPage = pageData.pageIndex + 1;
    this.transactionsPerPage = pageData.pageSize;
    this.transactionService.getTransactions
    (this.transactionsPerPage, this.currPage, this.accountId, this.filterOption, this.filterString, this.dtp1.value, this.dtp2.value);
  }

  onDelete(row: any) {
    console.log(row.id);
    this.loading = true;
    this.transactionService.deleteTransaction(row.id).subscribe((transactionData: any) => {
      this.openSnackBar(transactionData.message, null);
      this.transactionService
      .getTransactions
      (this.transactionsPerPage, this.currPage, this.accountId, this.filterOption, this.filterString, this.dtp1.value, this.dtp2.value);
    });
  }

  highlight(row) {
      this.selectedRowIndex = row.id;
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action ? 'Action Label' : 'Hide', {
      duration: 3000,
    });
  }

  disableDate() {
    this.dtp1.reset();
    this.dtp1.disable();
    this.dtp2.reset();
    this.dtp2.disable();
  }
  enableDate() {
    this.dtp1.enable();
    this.dtp2.enable();
  }

  onSearch () {
    if (!this.isValidateSearch()) {
      return;
    }
    this.loading = true;
    this.accountId = null;
    this.formTitle = 'Transactions';
    this.transactionService
    .getTransactions(this.transactionsPerPage, 1, this.accountId, this.filterOption, this.filterString, this.dtp1.value, this.dtp2.value);
    this.subs = this.transactionService.getListUpdateListener()
      .subscribe((transactionData: {transactionData: TransactionModel[], transactionCount: number}) => {
      this.loading = false;
      this.currPage = 1;
      this.transactionData = transactionData.transactionData;
      this.totalTransactions = transactionData.transactionCount;
    });
  }

  isValidateSearch () {
    let err = false;
    if (this.filterOption === 'amount') {
      this.openSnackBar('Please enter numeric value.', null);
      return false;
    }
    if (this.dtp1.enabled === true) {
      if (this.dtp1.value === null) {
        this.dtp1.setErrors({'incorrect': true});
        this.dtp1.markAsTouched();
        err = true;
      }
      if (this.dtp2.value === null) {
        this.dtp2.setErrors({'incorrect': true});
        this.dtp2.markAsTouched();
        err = true;
      }
      if (err) {
        this.openSnackBar('Please select date range.', null);
        return false;
      }
      if (this.dtp1.value > this.dtp2.value) {
        this.openSnackBar('Error: From date is greater than until date.', null);
        return false;
      }
    }
    return true;
  }
}
