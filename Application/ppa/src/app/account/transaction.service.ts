import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TransactionModel } from './transaction.model';
import * as syncreq from 'sync-request';

@Injectable({providedIn: 'root'})
export class TransactionService {
  private transactions: TransactionModel[] = [];
  private listUpdated = new Subject<{transactionData: TransactionModel[], transactionCount: number}>();
  request = require('sync-request');
  constructor(private http: HttpClient) {}

  getTransactions(transactionsPerPage: number, currPage: number, account: string, filter: string, value: string, from: Date, until: Date) {
    let strfrom;
    let struntil;
    if (from !== null && until !== null) {
      strfrom = from.toISOString();
      struntil = until.toISOString();
    }
    // tslint:disable-next-line:max-line-length
    let queryParams = `?pagesize=${transactionsPerPage}&currpage=${currPage}&filter=${filter}&value=${value}&from=${strfrom}&until=${struntil}`;
    if (account) {
      queryParams = queryParams + `&accid=${account}`;
    }
    this.http
      .get<{ message: string; transactions: any, transactionCount: number }>(
        '/api/transaction' + queryParams
      )
      .pipe(map((transactionData) => {
        return { transactionData: transactionData.transactions.map(transaction => {
          return {
            accId: transaction.accId,
            desc: transaction.desc,
            amount: transaction.amount,
            date: transaction.date,
            entered: transaction.entered,
            donation: transaction.donation,
            id: transaction._id
          };
        }), transactionCount: transactionData.transactionCount};
      }))
      .subscribe(transformedTransactionData => {
        this.transactions = transformedTransactionData.transactionData;
        this.listUpdated.next({transactionData: [...this.transactions], transactionCount: transformedTransactionData.transactionCount});
      });
  }

  deleteTransaction(id: string) {
    return this.http.delete('/api/transaction/' + id);
  }

  getTransaction(traId: string) {
    return this.http.get<{documents: any}>('/api/transaction/' + traId);
  }

  incomeMonth() {
    return this.http.get<{documents: any}>('/api/transaction/income/month');
  }

  incomeYear() {
    return this.http.get<{documents: any}>('/api/transaction/income/year');
  }

  expenseMonth() {
    return this.http.get<{documents: any}>('/api/transaction/expense/month');
  }

  expenseYear() {
    return this.http.get<{documents: any}>('/api/transaction/expense/year');
  }

  accBal(accId: string) {
    const queryParams = `?accId=${accId}`;
    // return this.http.get<{documents: any}>('/api/transaction/balance/account' + queryParams);
    // const request = require('sync-request');
    const res = this.request('GET', '/api/transaction/balance/account' + queryParams);
    // const tdata = res.getBody();
    const obj = JSON.parse(res.getBody());
    return obj.amount;
  }

  updateTransaction (id: string, accId: string, amount: string, desc: string, entered: string, donation: string) {
    const transactionData = {
      'accId': accId,
      'amount': amount,
      'desc': desc,
      'entered': entered,
      'donation': donation
    };
    return this.http.put('/api/transaction/' + id, transactionData);
  }


  addTransaction(accId: string, amount: number, desc: string, entered: string, donation: string) {
    const transactionData = {
      'accId': accId,
      'amount': amount,
      'desc': desc,
      'entered': entered,
      'donation': donation
    };
    return this.http
      .post<{ message: string, transactionObj: any }>('/api/transaction', transactionData);
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }

  getAccountIdList() {
    return this.http.get<{documents: any}>('/api/account/active/all');
  }
}
