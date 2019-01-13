import { Component, OnInit } from '@angular/core';
import { RequestModel } from '../letter-request/request.model';
import { RequestService } from '../letter-request/request.service';
import { MembershipService } from '../new-membership/membership/membership.service';
import { Membership, Interest, OtherEducation, Degree, Child } from '../new-membership/membership/membership.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-review-letter-requests',
  templateUrl: './review-letter-requests.component.html',
  styleUrls: ['./review-letter-requests.component.css']
})
export class ReviewLetterRequestsComponent implements OnInit {
  letterRequests = [] as RequestModel[];
  selectedStatus = 'all';
  selectedType = 'all';
  searchText = '';
  detailedRequests = [] as DetailedLetterRequest[];

  constructor(private letterRequestService: RequestService,
              private membershipService: MembershipService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllLetterRequests();
  }

  // get all letter requests from the database
  private getAllLetterRequests() {
    this.letterRequestService.getAllRequest().subscribe((requestData: RequestModel[]) => {  // server call
      if (requestData) {
        let index = 0;
        this.letterRequests = requestData;
        this.detailedRequests = [] as DetailedLetterRequest[];
        this.letterRequests.forEach(rqst => {
          const tmpRqstObj: DetailedLetterRequest = { // create a detailed letter request object and set its field values
            _id: <string> rqst._id,
            memberID: <string> rqst.memberID,
            memberName: '',
            expected_date: <string> rqst.expected_date,
            progress: rqst.progress,
            remark: rqst.remark,
            type: rqst.type
          };
          this.detailedRequests.push(tmpRqstObj); // add the detailed letter request object into the array
          this.setMemberName(<string>rqst.memberID, index++); // set the member name of the recently added object
        });
      }
    });
  }

  // set the member name to the letter request
  setMemberName(memberId: string, index: number) {
    this.membershipService.getMembershipByMemberId(memberId).subscribe(data => {  // get the member name passing the member ID
      if (data) {
        const member = data as Membership;  // cast the returned data to a membership object
        this.detailedRequests[index].memberName = member.memberName;  // set the membername of the letter request object
      }
    });
  }

  // Accept the letter request
  onAccept(letterRequest: RequestModel): void {
    letterRequest.progress = 'Accepted';  // set the progress as accepted
    this.letterRequestService.editReq(letterRequest); // update call
    this.openSnackBar('Letter Request Accepted'); // show the confirmation message
    // open the letter preparation window (not yet implemented)
  }

  onReject(letterRequest: RequestModel): void {
    letterRequest.progress = 'Rejected';  // set the progress as rejected
    this.letterRequestService.editReq(letterRequest); // update call
    this.openSnackBar('Letter Request Rejected'); // show the confirmation message
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  getMemberNameInIndex(index: number) {
    return this.detailedRequests[index].memberName;
  }

}

class DetailedLetterRequest {
  _id: string;
  memberID: string;
  memberName: string;
  type: string;
  remark: string;
  expected_date: string;
  progress: string;

  constructor() {}
}
