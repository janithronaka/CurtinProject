import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountModel } from '../account.model';
import { AccountService } from '../account.service';
import { Subscription } from 'rxjs';
import { PageEvent, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-accounts',
  templateUrl: './view-accounts.component.html',
  styleUrls: ['./view-accounts.component.css']
})
export class ViewAccountsComponent implements OnInit, OnDestroy {
  totalAccounts = 0;
  accountsPerPage = 15;
  currPage = 1;
  loading = false;
  pageSizeOption = [15, 30, 50, 100];
  accountData: AccountModel[] = [];
  public accountService: AccountService;
  private subs: Subscription;
  displayedColumns: string[] = ['accId', 'desc', 'status', 'actionsColumn'];
  dataSource = this.accountData;
  selectedRowIndex = -1;
  filterString = '';
  filterOption = 'all';

  constructor(accountService: AccountService, public snackBar: MatSnackBar) {
    this.accountService = accountService;
  }

  ngOnInit(): void {
    this.loading = true;
    this.accountService.getAccounts(this.accountsPerPage, 1, this.filterOption, this.filterString);
    this.subs = this.accountService.getListUpdateListener()
      .subscribe((accountData: {accountData: AccountModel[], accountCount: number}) => {
      this.loading = false;
      this.accountData = accountData.accountData;
      this.totalAccounts = accountData.accountCount;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onPageChanged(pageData: PageEvent) {
    this.loading = true;
    this.currPage = pageData.pageIndex + 1;
    this.accountsPerPage = pageData.pageSize;
    this.accountService.getAccounts(this.accountsPerPage, this.currPage, this.filterOption, this.filterString);
  }

  onDelete(row: any) {
    console.log(row.id);
    this.loading = true;
    this.accountService.deleteAccount(row.accId).subscribe((accountData: any) => {
      // window.alert(accountData.message);
      this.openSnackBar(accountData.message, null);
      this.accountService.getAccounts(this.accountsPerPage, this.currPage, this.filterOption, this.filterString);
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
  onSearch () {
    this.loading = true;
    this.accountService.getAccounts(this.accountsPerPage, 1, this.filterOption, this.filterString);
    this.subs = this.accountService.getListUpdateListener()
      .subscribe((accountData: {accountData: AccountModel[], accountCount: number}) => {
      this.loading = false;
      this.currPage = 1;
      this.accountData = accountData.accountData;
      this.totalAccounts = accountData.accountCount;
    });
  }
}
