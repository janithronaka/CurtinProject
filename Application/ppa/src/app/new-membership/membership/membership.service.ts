import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Membership } from './membership.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MembershipService {
  private accounts: Membership[] = [];
  private listUpdated = new Subject<{accountData: Membership[], accountCount: number}>();

  constructor (private http: HttpClient) {}

  getAllMemberships() {
    return this.http.get('/api/membership/all');
  }

  addMembership(formData: any) {
    this.http.post<{ status: any, message: any }>('/api/membership',
                                                  formData).subscribe();
  }

  saveMembership(updateForm: any) {
    this.http.put<{ status: any, message: any }>('/api/membership/',
                                                  updateForm).subscribe();
  }

  updateMemberAccount (accountData: any) {
    return this.http.put('/api/membership/', accountData);
  }

  deleteMembership(membershipId: any) {
    this.http.delete('/api/membership/' + membershipId).subscribe();
  }

  getAllProfileCount() {
    return this.http.get('/api/membership/count/profiles');
  }

  getNewMembershipCount() {
    return this.http.get('/api/membership/count/requests');
  }

  getMembershipByMemberId(memberId: string) {
    return this.http.get('/api/membership/member/' + memberId);
  }

  getMembershipByObjId(objId: string) {
    return this.http.get('/api/membership/memberobj/' + objId);
  }

  // This method generates a new member ID depending on the current memberships count
  generateMemberId(membershipCount: number) {
    let _id = '';
    membershipCount += 1;

    // There are 4 different memberID formats depending on the memebership count
    if (membershipCount < 1000000) {
      if (membershipCount < 1000) {
        for (let i = membershipCount.toString().length; i < 3; i++) {
          _id += '0';
        }
      } else if (membershipCount < 10000) {
        for (let i = membershipCount.toString().length; i < 4; i++) {
          _id += '0';
        }
      } else if (membershipCount < 100000) {
        for (let i = membershipCount.toString().length; i < 5; i++) {
          _id += '0';
        }
      } else if (membershipCount < 1000000) {
        for (let i = membershipCount.toString().length; i < 5; i++) {
          _id += '0';
        }
      }
      _id += membershipCount;
      _id = 'S' + _id;  // Adds the prefix "S" to the memeberID
      return _id;
    } else {
      alert('Maximum membership count reached!'); // The maximum membership count is set as 1000000.
      return null;
    }
  }


  getMembersDir(accountsPerPage: number, currPage: number, filter: string, value: string) {
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
        '/api/membership/all/dir' + queryParams
      )
      .pipe(map((accountData) => {
        return { accountData: accountData.accounts.map(account => {
          return {
            memberName: account.memberName,
            nicNo: account.nicNo,
            addmissionNo: account.addmissionNo,
            _id: account._id
          };
        }), accountCount: accountData.accountCount};
      }))
      .subscribe(transformedAccountData => {
        this.accounts = transformedAccountData.accountData;
        this.listUpdated.next({accountData: [...this.accounts], accountCount: transformedAccountData.accountCount});
      });
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }
}
