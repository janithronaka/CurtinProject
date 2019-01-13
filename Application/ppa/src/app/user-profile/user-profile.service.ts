import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Membership } from './user-profile.model';

@Injectable({providedIn: 'root'})
export class MembershipService {

  constructor (private http: HttpClient) {}
  // get all memberships
  getAllMemberships() {
    return this.http.get('/api/membership/all');
  }

  // update member details
  saveMembership(updateForm: any) {
    this.http.put<{ status: any, message: any }>('/api/membership/', updateForm).subscribe();
  }

  // get membership count
  getNewMembershipCount() {
    return this.http.get('/api/membership/count/requests');
  }

  // get membership by member id
  getMembershipByMemberId(memberId: string) {
    return this.http.get('/api/membership/member/' + memberId);
  }


}
