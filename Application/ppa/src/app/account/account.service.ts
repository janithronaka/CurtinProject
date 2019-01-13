import { AccountModel } from './account.model';
import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AccountService {
  private accounts: AccountModel[] = [];
  private listUpdated = new Subject<{accountData: AccountModel[], accountCount: number}>();

  constructor(private http: HttpClient) {}

  getAccounts(accountsPerPage: number, currPage: number, filter: string, value: string) {
    const queryData = {
      'filter': 'Any',
      'value': '11',
      'date': 'false',
      'from': '',
      'to': ''
    };
    const queryParams = `?pagesize=${accountsPerPage}&currpage=${currPage}&filter=${filter}&value=${value}`;
    this.http
      .get<{ message: string; accounts: any, accountCount: number }>(
        '/api/account' + queryParams
      )
      .pipe(map((accountData) => {
        return { accountData: accountData.accounts.map(account => {
          return {
            accId: account.accId,
            desc: account.desc,
            status: account.status,
            id: account._id
          };
        }), accountCount: accountData.accountCount};
      }))
      .subscribe(transformedAccountData => {
        this.accounts = transformedAccountData.accountData;
        this.listUpdated.next({accountData: [...this.accounts], accountCount: transformedAccountData.accountCount});
      });
  }

  getCount() {
    return this.http.get('/api/account/count/all');
  }

  deleteAccount(id: string) {
    return this.http.delete('/api/account/' + id);
  }

  getAccount(accId: string) {
    return this.http.get<{documents: any}>('/api/account/' + accId);
  }

  updateAccount (accId: string, desc: string, status: string) {
    const accountData = {
      'desc': desc,
      'status': status
    };
    return this.http.put('/api/account/' + accId, accountData);
  }

  addAccount(accId: string, desc: string, status: string) {
    // const accountData = new FormData();
    // accountData.append('accId', accId);
    // accountData.append('desc', desc);
    // accountData.append('status', status);

    const accountData = {
      'accId': accId,
      'desc': desc,
      'status': status
    };
    return this.http
      .post<{ message: string, accountObj: any }>('/api/account', accountData);
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }
}
