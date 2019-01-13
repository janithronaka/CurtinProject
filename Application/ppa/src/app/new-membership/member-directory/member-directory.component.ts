import { Component, OnDestroy, OnInit } from '@angular/core';
import { Membership } from '../membership/membership.model';
import { MembershipService } from '../membership/membership.service';
import { Subscription } from 'rxjs';
import { PageEvent, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-member-directory',
  templateUrl: './member-directory.component.html',
  styleUrls: ['./member-directory.component.css']
})
export class MemberDirectoryComponent implements OnInit, OnDestroy {
  totalAccounts = 0;
  accountsPerPage = 15;
  currPage = 1;
  loading = false;
  pageSizeOption = [15, 30, 50, 100];
  accountData: Membership[] = [];
  public membershipService: MembershipService;
  private subs: Subscription;
  displayedColumns: string[] = ['memberName', 'nicNo', 'addmissionNo', 'actionsColumn'];
  dataSource = this.accountData;
  selectedRowIndex = -1;
  filterString = '';
  filterOption = 'all';

  constructor(membershipService: MembershipService, public snackBar: MatSnackBar) {
    this.membershipService = membershipService;
  }

  ngOnInit(): void {
    // this.loading = true;
    this.membershipService.getMembersDir(this.accountsPerPage, 1, this.filterOption, this.filterString);
    this.subs = this.membershipService.getListUpdateListener()
      .subscribe((accountData: {accountData: Membership[], accountCount: number}) => {
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
    this.membershipService.getMembersDir(this.accountsPerPage, this.currPage, this.filterOption, this.filterString);
  }

  onDelete(row: any) {
    console.log(row.id);
    // this.loading = true;
    // this.MembershipService.deleteAccount(row.accId).subscribe((accountData: any) => {
      // window.alert(accountData.message);
      // this.openSnackBar(accountData.message, null);
      // this.MembershipService.getAccounts(this.accountsPerPage, this.currPage, this.filterOption, this.filterString);
    // });
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
    this.membershipService.getMembersDir(this.accountsPerPage, 1, this.filterOption, this.filterString);
    this.subs = this.membershipService.getListUpdateListener()
      .subscribe((accountData: {accountData: Membership[], accountCount: number}) => {
      this.loading = false;
      this.currPage = 1;
      this.accountData = accountData.accountData;
      this.totalAccounts = accountData.accountCount;
    });
  }
}
