import { Component, OnInit, Inject } from '@angular/core';
import { Membership, Child, Interest, OtherEducation, Degree } from '../membership/membership.model';
import { MembershipService } from '../membership/membership.service';
import { MatCheckboxChange, MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-review-memberships',
  templateUrl: './review-memberships.component.html',
  styleUrls: ['./review-memberships.component.css']
})
export class ReviewMembershipsComponent implements OnInit {
  membershipRequests = [] as Membership []; // this array stores all the membership requests
  selected = 'all';
  searchText = '';
  selectedMemberships = [] as Membership [];  // this array stores all the selected membership requests
  bAcceptBtn = false;
  bRejectBtn = false;
  checkBoxResetStaus = false;

  constructor(public membershipService: MembershipService,
              private dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllMembershipRequests();  // fetch all the memebership requests from the db
    this.setBtnAvailability();  // set the Accept and Reject button availability
  }

  // get all membership requests curently exists in the database
  private getAllMembershipRequests() {
    this.membershipService.getAllMemberships().subscribe((data: any) => {
      if ( data ) {
        this.membershipRequests = data;
        this.checkBoxResetStaus = true;
        this.clearSelectedMembershipsList();
      } else {
        // error handling
      }
    });
  }

  // push the selected request into the selected membership requests array
  private onCheckboxToogle(event: MatCheckboxChange, membership: Membership) {
    if (event.checked) {
      this.selectedMemberships.push(membership);
    } else {
      const index = this.getMembershipIndex(membership._id);
      if ( index !== -1) {
        this.selectedMemberships.splice(index, 1);
      }
    }
    this.setBtnAvailability();
  }

  private onClickDetailedView(membershipObj: Membership): void {
    const dialogRef = this.dialog.open(DetailedMembershipDialog, { data: membershipObj});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private onSortingChange() {
    this.clearSelectedMembershipsList();
    this.setBtnAvailability();
  }

  private clearSelectedMembershipsList() {
    this.selectedMemberships.splice(0, this.selectedMemberships.length);
  }

  // validate the Accept and Reject button
  private setBtnAvailability() {
    if (this.selectedMemberships.length > 0) {
      this.bAcceptBtn = this.getAcceptBtnVisibility();
      this.bRejectBtn = this.getRejectBtnVisibility();
    } else {
      this.bAcceptBtn = false;
      this.bRejectBtn = false;
    }
  }

  // get the memberships count which have a memberID
  private getMembershipsWithId() {
    let count = 0;
    this.membershipRequests.forEach(membership => {
      if (membership.memberId != null && membership.memberId !== '') {
        count++;
      }
    });
    return count;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  // set all the selected membership requests to Accepted
  private setAllAccepted() {
    let count = 0;  // this variable used to generate a new id for the memberships
    const membershipsWithId = this.getMembershipsWithId();
    let acceptedMembershipCount = 0;
    this.selectedMemberships.forEach( membership => {
     if (membership.dataType !== 'Profile') { // check the current status if the membership request
      membership.dataType = 'Profile';  // set the staus as Profile
      membership.approvalChange = '1';
      if (membership.memberId == null || membership.memberId === '') {
        acceptedMembershipCount = membershipsWithId + count;
        count++;
        membership.memberId = this.membershipService.generateMemberId(acceptedMembershipCount); // setting a memberID to the new memberships
      }
      this.membershipService.saveMembership(membership);  // update call
     }
    });
    this.setBtnAvailability();
    this.getAllMembershipRequests();
    this.openSnackBar('Membership Requests Accepted');
  }

  // use to reset the checkboxes after a sorting, accept or a reject
  public checkBoxStaus(checkBoxValue: boolean, resetStaus: boolean) {
    if (resetStaus) {
      this.checkBoxResetStaus = false;
      return false;
    } else {
      return checkBoxValue;
    }
  }

  // set all the selected membership request to Accepted status
  private setAllRejected() {
    // loop through the selected membership requests
    this.selectedMemberships.forEach( membership => {
      if (membership.dataType !== 'Rejected') { // validate the current status of the membership request
        membership.dataType = 'Rejected'; // set the membership status
        membership.approvalChange = '1';  // this field value is used to track whether its a status update or a regular update of the object
        this.membershipService.saveMembership(membership);  // set the membership status
      }
    });
    this.setBtnAvailability();
    this.getAllMembershipRequests();
    this.openSnackBar('Membership Requests Rejected');
  }

  // set the Accept button availability
  private getAcceptBtnVisibility() {
    let visible = false;
    this.selectedMemberships.forEach( membership => {
      if (!visible) {
        // Reect button is available only if the selected memberships has an request in Request or Rejected status
        if (membership.dataType === 'Rejected' || membership.dataType === 'Request') {
          visible = true;
        }
      }
    });
    return visible;
  }

  // set the Reject button availability
  private getRejectBtnVisibility() {
    let visible = false;
    this.selectedMemberships.forEach( membership => {
      if (!visible) {
        // Reect button is available only if the selected memberships has an request in Request or Profile status
        if (membership.dataType === 'Profile' || membership.dataType === 'Request') {
          visible = true;
        }
      }
    });
    return visible;
  }

  private getMembershipIndex(id: string) {
    let found = false;
    let index = -1;
    let counter = 0;
    this.selectedMemberships.forEach( membership => {
      if (!found) {
        if (membership._id === id) {
          found = true;
          index = counter;
        }
      }
      counter++;
    });
    return index;
  }
}

@Component({
  selector: 'app-detailed-membership-dialog',
  templateUrl: 'detailed-membership-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DetailedMembershipDialog implements OnInit {
  bAcceptBtn = false;
  bRejectBtn = false;
  bDegreeInfo = false;
  bOtherInfo = false;
  bInterestInfo = false;
  bChildrenInfo = false;
  bSpouseInfo = false;
  bRefInfo = false;
  degreeDetails: Degree [];
  childrenDetails: Child [];
  otherDetails: OtherEducation [];
  interestDetails: Interest [];

  constructor(
    public dialogRef: MatDialogRef<DetailedMembershipDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Membership,
    public membershipService: MembershipService,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.degreeDetails = <Degree[]> this.data.degreeDetails;
    this.otherDetails = <OtherEducation[]> this.data.otherQualif;
    this.interestDetails = <Interest[]> this.data.interests;
    this.childrenDetails = <Child[]> this.data.childrenInfo;
    this.bDegreeInfo = this.isDegreeDetailsEmpty();
    this.bOtherInfo = this.isOtherDetailsEmpty();
    this.bInterestInfo = this.isInterestDetailsEmpty();
    this.bChildrenInfo = this.isChildrenDetailsEmpty();
    this.bSpouseInfo = this.isSpouseDetailsEmpty();
    this.bRefInfo = this.isReferenceDetailsEmpty();
    this.updateButtonVisibility();
  }

  // Accepts a single membership request
  onAccept(): void {
    this.data.dataType = 'Profile'; // set the membership status as Profile
    this.data.approvalChange = '1';
    this.membershipService.saveMembership(this.data); // update call
    this.updateButtonVisibility(); // button validations
    this.openSnackBar('Membership Request Accepted'); // confirmation message
  }

  // shows a snack bar message to the user
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000, // time duration the snackbar will be displayed
    });
  }

  // set the accept and reject button availability checking the membership status
  private updateButtonVisibility() {
    this.bAcceptBtn = (this.data.dataType === 'Request' || this.data.dataType === 'Rejected');
    this.bRejectBtn = (this.data.dataType === 'Profile' || this.data.dataType === 'Request');
  }

  // check whether the degree details array is empty or not
  private isDegreeDetailsEmpty() {
    let isempty = true;
    this.degreeDetails.forEach((degreeInfo: Degree) => {
      if (isempty) {
        if (degreeInfo.degreeProgram !== '' && degreeInfo.degreeProgram != null) {
          isempty = false;
        }
        if (degreeInfo.university !== '' && degreeInfo.university != null) {
          isempty = false;
        }
        if (degreeInfo.degreeYear !== '' && degreeInfo.degreeYear != null) {
          isempty = false;
        }
      }
    });
    return isempty;
  }

  // Rejects a single membership request
  onReject(): void {
    this.data.dataType = 'Rejected';  // set the status as Rejected
    this.data.approvalChange = '1';
    this.membershipService.saveMembership(this.data); // call to the update method of memebership service
    this.updateButtonVisibility();  // validate the button availability after the update
    this.openSnackBar('Membership Request Rejected'); // confirm the reject action to the end user
  }

  // check whether the other qualifications fields are empty
  private isOtherDetailsEmpty() {
    let isempty = true;
    this.otherDetails.forEach((otherInfo: OtherEducation) => {  // loop the otherdetails array
      if (isempty) {
        if (otherInfo.diplomaName !== '' && otherInfo.diplomaName != null) {
          isempty = false;
        }
        if (otherInfo.diplomaYear !== '' && otherInfo.diplomaYear != null) {
          isempty = false;
        }
        if (otherInfo.institute !== '' && otherInfo.institute != null) {
          isempty = false;
        }
      }
    });
    return isempty;
  }

  private isInterestDetailsEmpty() {
    let isempty = true;
    this.interestDetails.forEach((interestInfo: Interest) => {
      if (isempty) {
        if (interestInfo.interestType !== '' && interestInfo.interestType != null) {
          isempty = false;
        }
        if (interestInfo.interestDesc !== '' && interestInfo.interestDesc != null) {
          isempty = false;
        }
      }
    });
    return isempty;
  }

  private isSpouseDetailsEmpty() {
    return (this.data.spouseName === '' || this.data.spouseName == null) &&
            (this.data.spouseDOB === '' || this.data.spouseDOB == null) &&
            (this.data.spouseEmail === '' || this.data.spouseEmail == null) &&
            (this.data.spouseNic === '' || this.data.spouseNic == null) &&
            (this.data.spouseOccup === '' || this.data.spouseOccup == null) &&
            (this.data.spouseWorkAddress === '' || this.data.spouseWorkAddress == null) &&
            (this.data.spouseWorkArea === '' || this.data.spouseWorkArea == null) &&
            (this.data.spouseWorkTel === '' || this.data.spouseWorkTel == null);
  }

  private isReferenceDetailsEmpty() {
    return (this.data.refEmail === '' || this.data.refEmail == null) &&
            (this.data.refName === '' || this.data.refName == null);
  }

  private isChildrenDetailsEmpty() {
    let isempty = true;
    this.childrenDetails.forEach((childInfo: Child) => {
      if (isempty) {
        if (childInfo.childName !== '' && childInfo.childName != null) {
          isempty = false;
        }
        if (childInfo.childDob !== '' && childInfo.childDob != null) {
          isempty = false;
        }
        if (childInfo.childSchool !== '' && childInfo.childSchool != null) {
          isempty = false;
        }
      }
    });
    return isempty;
  }

}

class DegreeObject implements Degree {
  degreeProgram: string;    university: string;
  degreeYear: string;

  constructor() {}
}

class OtherObject implements OtherEducation {
  diplomaName: string;  institute: string;
  diplomaYear: string;

  constructor() {}
}

class InterestObject implements Interest {
  interestType: string;  interestDesc: string;

  constructor() {}}

class ChildObject implements Child {
  childName: string;  childDob: string;
  childSchool: string;

  constructor() {}
}
