import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../account.service';
import { TransactionService } from '../transaction.service';
import { TransactionModel } from '../transaction.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {
  public accountService: AccountService;
  public transactionService: TransactionService;
  loadingCount = false;
  loadingRecent = false;
  loadingIncome = false;
  loadingExpense = false;
  totalAccounts = 0;
  transactionData: TransactionModel[] = [];
  displayedColumns: string[] = ['accId', 'amount'];
  incomeMonth = 0;
  incomeYear = 0;
  expensMonth = 0;
  expenseYear = 0;
  private subs: Subscription;

  constructor(accountService: AccountService, transactionService: TransactionService) {
    this.accountService = accountService;
    this.transactionService = transactionService;
  }

  getCount() {
    this.loadingCount = true;
    this.accountService.getCount().subscribe((accountData: any) => {
      this.loadingCount = false;
      this.totalAccounts = accountData.accountCount;
    });
  }

  getRecentTransactions() {
    this.loadingRecent = true;
    this.transactionService.getTransactions(5, 1, null, null, null, null, null);
    this.subs = this.transactionService.getListUpdateListener()
      .subscribe((transactionData: {transactionData: TransactionModel[], transactionCount: number}) => {
      this.loadingRecent = false;
      this.transactionData = transactionData.transactionData;
    });
  }

  ngOnInit(): void {
    this.getCount();
    this.getRecentTransactions();
    this.getIncomeM();
    this.getIncomeY();
    this.getExpenseM();
    this.getExpenseY();
  }

  ngOnDestroy(): void {

  }

  getIncomeM() {
    this.loadingIncome = true;
    this.transactionService.incomeMonth().subscribe((transactionData: any) => {
      this.incomeMonth = transactionData.amount;
      this.loadingIncome = false;
    });
  }
  getIncomeY() {
    this.loadingIncome = true;
    this.transactionService.incomeYear().subscribe((transactionData: any) => {
      this.incomeYear = transactionData.amount;
      this.loadingIncome = false;
    });
  }
  getExpenseM() {
    this.loadingExpense = true;
    this.transactionService.expenseMonth().subscribe((transactionData: any) => {
      this.expensMonth = transactionData.amount;
      this.loadingExpense = false;
    });
  }
  getExpenseY() {
    this.loadingExpense = true;
    this.transactionService.expenseYear().subscribe((transactionData: any) => {
      this.expenseYear = transactionData.amount;
      this.loadingExpense = false;
    });
  }
}
