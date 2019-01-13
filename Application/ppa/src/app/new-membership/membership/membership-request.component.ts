import { Component, OnInit, ViewChild } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray, AbstractControl} from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatSelectChange} from '@angular/material/select';
import { MatStepper } from '@angular/material';
import { MembershipService } from './membership.service';
import { Membership, Degree, OtherEducation, Interest, Child } from './membership.model';

@Component({
  selector: 'app-membership-request',
  templateUrl: './membership-request.component.html',
  styleUrls: ['./membership-request.component.css']
})
export class MembershipRequestComponent implements OnInit {
  // @ViewChild('stepper') stepper: MatStepper;
  membershipObj: MembershipObject = new MembershipObject();
  memberships: Membership [] = [];
  personalDetails: FormGroup;
  occupationDetails: FormGroup;
  educationalDetails: FormGroup;
  otherDetails: FormGroup;
  interestDetails: FormGroup;
  spouseDetails: FormGroup;
  childrenDetails: FormGroup;
  referenceDetails: FormGroup;
  reviewPersonal: FormGroup;
  reviewEducation: FormGroup;
  reviewOccupation: FormGroup;
  reviewOther: FormGroup;
  reviewInterests: FormGroup;
  reviewSpouse: FormGroup;
  reviewChildren: FormGroup;
  reviewRef: FormGroup;
  reviewDetails: FormGroup;
  reviewArray: any;
  stepHeading: any = '';
  isSingle: any = true;
  linearMode: any = true;
  bStep1: any;
  bStep2: any;
  bStep3: any;
  bStep4: any;
  bStep5: any;
  bStep6: any;
  bStep7: any;
  bStep8: any;
  bHasPersonalEmail: any;
  bDegreeDetails: any;
  stepTitles: any = [
    'Personal Details',
    'Occupation Details',
    'Educational Qualifications',
    'Other Qualifications',
    'Other Abilities & Interests',
    'Spouse Details',
    'Children Details',
    'Email Reference',
    'Review Application'
  ];

  constructor(private _formBuilder: FormBuilder, public membershipService: MembershipService) { }

  ngOnInit() {
    this.linearMode = true;
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    const emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.stepHeading = this.stepTitles[0];
    this.bStep1 = false;
    this.bStep2 = false;
    this.bStep3 = false;
    this.bStep4 = false;
    this.bStep5 = false;
    this.bStep6 = false;
    this.bStep7 = false;
    this.bStep8 = false;
    this.bHasPersonalEmail = false;
    this.bDegreeDetails = false;
    this.getAllMemberships();
    this.personalDetails = this._formBuilder.group({
      memberName: ['', Validators.required],
      preferredName: ['', Validators.required],
      nicNo: ['', Validators.required],
      memberDob: ['', Validators.required],
      nationality: [''],
      religion: [''],
      addmisionDate: ['', Validators.required],
      addmissionNo: [''],
      leavingDate: ['', Validators.required],
      registrationDate: ['', Validators.required],
      receiptNo: [''],
      civilStatus: ['', Validators.required],
      childrenCount: [''],
      homeAddress: ['', Validators.required],
      homeTel: [''],
      mobileNo: ['', Validators.required],
      personalEmail: ['', Validators.pattern(emailRegEx)]
    });
    this.occupationDetails = this._formBuilder.group({
      memberOccup: ['', Validators.required],
      memberWorkArea: ['', Validators.required],
      memberEmployer: ['', Validators.required],
      memberWorkAddress: [''],
      memberWorkTel: [''],
      memberWorkEmail: ['', Validators.pattern(emailRegEx)]
    });
    this.educationalDetails = this._formBuilder.group({
      olYear: ['', [Validators.required, Validators.pattern(yearPatern)]],
      alYear: ['', Validators.pattern(yearPatern)],
      degreeDetails: this._formBuilder.array([
        this.newDegreeInfo()
      ])
    });
    this.otherDetails = this._formBuilder.group({
      otherQualif: this._formBuilder.array([
        this.newOtherQualifInfo()
      ])
    });
    this.interestDetails = this._formBuilder.group({
      interests: this._formBuilder.array([
        this.newInterestsInfo()
      ])
    });
    this.spouseDetails = this._formBuilder.group({
      spouseName: ['', Validators.required],
      spouseDOB: [''],
      spouseNic: [''],
      spouseOccup: ['', Validators.required],
      spouseWorkArea: ['', Validators.required],
      spouseWorkAddress: [''],
      spouseWorkTel: [''],
      spouseEmail: ['', Validators.pattern(emailRegEx)]
    });
    this.childrenDetails = this._formBuilder.group({
      childrenInfo: this._formBuilder.array([
        this.newChildrenInfo()
      ])
    });
    this.referenceDetails = this._formBuilder.group({
      refName: [''],
      refEmail: ['', Validators.pattern(emailRegEx)]
    });
    this.setDummyValues();
  //   this.stepper.selectionChange.subscribe(selection => {
  //     console.log(selection.selectedStep);
  //     console.log(selection.previouslySelectedStep);
  //     this.onStepperChange(selection);
  //  });
  }

  private getAllMemberships() {
    this.membershipService.getAllMemberships().subscribe((data: Membership[]) => {
      if (data) {
        this.memberships = data;
      }
    });
  }

  onStepperChange($event: StepperSelectionEvent) {
    this.stepHeading = this.stepTitles[$event.selectedIndex];
    if ($event.previouslySelectedIndex === 0) {
      if (this.isSingle) {
        this.childrenDetails.reset();
        this.spouseDetails.reset();
        this.spouseDetails.disable();
        this.childrenDetails.disable();
      } else {
        this.spouseDetails.enable();
        this.childrenDetails.enable();
      }
      this.onStepOneNext();
    } else if ($event.previouslySelectedIndex === 1) {
      this.onStepTwoNext();
    } else if ($event.previouslySelectedIndex === 2) {
      this.onStepThreeNext();
    } else if ($event.previouslySelectedIndex === 3) {
      this.onStepFourNext();
    } else if ($event.previouslySelectedIndex === 4) {
      this.onStepFiveNext();
    } else if ($event.previouslySelectedIndex === 5 && !this.isSingle) {
      this.onStepSixNext();
    } else if ($event.previouslySelectedIndex === 6 && !this.isSingle) {
      this.onStepSevenNext();
    } else if ($event.previouslySelectedIndex === 7) {
      this.onStepEightNext();
    }
  }

  onCivilStatusChange ($event: MatSelectChange) {
    if ( $event.value === 'single' ) {
      this.personalDetails.controls['childrenCount'].setValue('');
      this.personalDetails.controls['childrenCount'].disable();
      this.isSingle = true;
    } else {
      this.personalDetails.controls['childrenCount'].enable();
      this.isSingle = false;
    }
  }

  private newDegreeInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      degreeProgram: [''],
      university: [''],
      Degreeyear: ['', Validators.pattern(yearPatern)]
    });
  }

  private onStepOneNext() {
    this.reviewPersonal = <FormGroup> this.copyFormControl (this.personalDetails);
    this.reviewPersonal.disable();
    this.membershipObj.memberName = this.personalDetails.get('memberName').value;
    this.membershipObj.preferredName = this.personalDetails.get('preferredName').value;
    this.membershipObj.nicNo = this.personalDetails.get('nicNo').value;
    this.membershipObj.memberDob = this.personalDetails.get('memberDob').value;
    this.membershipObj.nationality = this.personalDetails.get('nationality').value;
    this.membershipObj.religion = this.personalDetails.get('religion').value;
    this.membershipObj.addmisionDate = this.personalDetails.get('addmisionDate').value;
    this.membershipObj.addmissionNo = this.personalDetails.get('addmissionNo').value;
    this.membershipObj.leavingDate = this.personalDetails.get('leavingDate').value;
    this.membershipObj.registrationDate = this.personalDetails.get('registrationDate').value;
    this.membershipObj.receiptNo = this.personalDetails.get('receiptNo').value;
    this.membershipObj.civilStatus = this.personalDetails.get('civilStatus').value;
    this.membershipObj.childrenCount = this.personalDetails.get('childrenCount').value;
    this.membershipObj.homeAddress = this.personalDetails.get('homeAddress').value;
    this.membershipObj.homeTel = this.personalDetails.get('homeTel').value;
    this.membershipObj.mobileNo = this.personalDetails.get('mobileNo').value;
    this.membershipObj.personalEmail = this.personalDetails.get('personalEmail').value;
    if (this.membershipObj.personalEmail !== '' && this.membershipObj.personalEmail != null) {
      this.referenceDetails.get('refName').setValue('');
      this.referenceDetails.get('refEmail').setValue('');
      this.bHasPersonalEmail = true;
      this.referenceDetails.disable();
    } else {
      this.bHasPersonalEmail = false;
      this.referenceDetails.enable();
    }
    this.bStep1 = true;
  }

  private onStepTwoNext() {
    this.reviewOccupation = <FormGroup> this.copyFormControl (this.occupationDetails);
    this.reviewOccupation.disable();
    this.membershipObj.memberOccup = this.occupationDetails.get('memberOccup').value;
    this.membershipObj.memberWorkArea = this.occupationDetails.get('memberWorkArea').value;
    this.membershipObj.memberEmployer = this.occupationDetails.get('memberEmployer').value;
    this.membershipObj.memberWorkAddress = this.occupationDetails.get('memberWorkAddress').value;
    this.membershipObj.memberWorkTel = this.occupationDetails.get('memberWorkTel').value;
    this.membershipObj.memberWorkEmail = this.occupationDetails.get('memberWorkEmail').value;
    this.bStep2 = true;
  }

  private onStepThreeNext() {
    this.reviewEducation = <FormGroup> this.copyFormControl (this.educationalDetails);
    this.reviewEducation.disable();
    this.membershipObj.olYear = this.educationalDetails.get('olYear').value;
    this.membershipObj.alYear = this.educationalDetails.get('alYear').value;
    if (!this.isEmptyCollection(this.educationalDetails.get('degreeDetails'))) {
      this.membershipObj.degreeDetails = this.getDegreeRowArray(this.educationalDetails.get('degreeDetails'));
      this.bDegreeDetails = true;
    } else {
      this.bDegreeDetails = false;
    }
    this.bStep3 = true;
  }

  private onStepFourNext() {
    this.reviewOther = <FormGroup> this.copyFormControl (this.otherDetails);
    this.reviewOther.disable();
    if (!this.isEmptyCollection(this.otherDetails.get('otherQualif'))) {
      this.membershipObj.otherQualif = this.getOtherRowArray(this.otherDetails.get('otherQualif'));
      this.bStep4 = true;
    } else {
      this.bStep4 = false;
    }
  }

  private onStepFiveNext() {
    this.reviewInterests = <FormGroup> this.copyFormControl (this.interestDetails);
    this.reviewInterests.disable();
    if (!this.isEmptyCollection(this.interestDetails.get('interests'))) {
      this.membershipObj.interests = this.getInterestRowArray(this.interestDetails.get('interests'));
      this.bStep5 = true;
    } else {
      this.bStep5 = false;
    }
  }

  private onStepSixNext() {
    this.reviewSpouse = <FormGroup> this.copyFormControl (this.spouseDetails);
    this.reviewSpouse.disable();
    this.membershipObj.spouseName = this.spouseDetails.get('spouseName').value;
    this.membershipObj.spouseDOB = this.spouseDetails.get('spouseDOB').value;
    this.membershipObj.spouseNic = this.spouseDetails.get('spouseNic').value;
    this.membershipObj.spouseOccup = this.spouseDetails.get('spouseOccup').value;
    this.membershipObj.spouseWorkArea = this.spouseDetails.get('spouseWorkArea').value;
    this.membershipObj.spouseWorkAddress = this.spouseDetails.get('spouseWorkAddress').value;
    this.membershipObj.spouseWorkTel = this.spouseDetails.get('spouseWorkTel').value;
    this.membershipObj.spouseEmail = this.spouseDetails.get('spouseEmail').value;
    this.bStep6 = true;
  }

  private onStepSevenNext() {
    this.reviewChildren = <FormGroup> this.copyFormControl (this.childrenDetails);
    this.reviewChildren.disable();
    if (!this.isEmptyCollection(this.childrenDetails.get('childrenInfo'))) {
      this.membershipObj.childrenInfo = this.getChildRowArray(this.childrenDetails.get('childrenInfo'));
      this.bStep7 = true;
    } else {
      this.bStep7 = false;
    }
  }

  private onStepEightNext() {
    this.reviewRef = <FormGroup> this.copyFormControl (this.referenceDetails);
    this.reviewRef.disable();
    if (!this.isEmptyCollection(this.referenceDetails)) {
      this.membershipObj.refName = this.referenceDetails.get('refName').value;
      this.membershipObj.refEmail = this.referenceDetails.get('refEmail').value;
      this.bStep8 = true;
    } else {
      this.bStep8 = false;
    }
  }

  private resetFormFields(stepper: MatStepper) {
    stepper.reset();
    this.removeAllDegreeInfo();
    this.removeAllDiplomaInfo();
    this.removeAllInterestInfo();
    this.removeAllChildrenInfo();
    this.reviewPersonal = null;
    this.reviewOccupation = null;
    this.reviewEducation = null;
    this.reviewOther = null;
    this.reviewInterests = null;
    this.reviewSpouse = null;
    this.reviewChildren = null;
    this.reviewRef = null;
    this.membershipObj = new MembershipObject();
    this.bStep1 = false;
    this.bStep2 = false;
    this.bStep3 = false;
    this.bStep4 = false;
    this.bStep5 = false;
    this.bStep6 = false;
    this.bStep7 = false;
    this.bStep8 = false;
    this.bHasPersonalEmail = false;
  }

  private newOtherQualifInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      diplomaName: [''],
      institute: [''],
      diplomaYear: ['', Validators.pattern(yearPatern)]
    });
  }

  private newChildrenInfo() {
    return this._formBuilder.group({
      childName: [''],
      childDob: [''],
      childSchool: ['']
    });
  }

  private newInterestsInfo() {
    return this._formBuilder.group({
      interestType: [''],
      interestDesc: ['']
    });
  }

  private addChildRow() {
    const control = this.allChildrenRows;
    control.push(this.newChildrenInfo());
  }

  private removeChildRow(i: number) {
    const control = this.allChildrenRows;
    control.removeAt(i);
  }

  private addInterestRow() {
    const control = this.allInterestRows;
    control.push(this.newInterestsInfo());
  }

  private removeInterestRow(i: number) {
    const control = this.allInterestRows;
    control.removeAt(i);
  }

  private addDegreeRow() {
    const control = this.allDegreeRows;
    control.push(this.newDegreeInfo());
  }

  private removeDegreeRow(i: number) {
    const control = this.allDegreeRows;
    control.removeAt(i);
  }

  private addDiplomaRow() {
    const control = this.allDiplomaRows;
    control.push(this.newOtherQualifInfo());
  }

  private removeDiplomaRow(i: number) {
    const control = this.allDiplomaRows;
    control.removeAt(i);
  }

  private removeAllDiplomaInfo() {
    const control = this.allDiplomaRows;
    for ( let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }
    this.addDiplomaRow();
  }

  private removeAllChildrenInfo() {
    const control = this.allChildrenRows;
    for ( let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }
    this.addChildRow();
  }

  private removeAllReviewDegreeInfo() {
    const control1 = this.allReviewDegreeRows;
    for ( let i = control1.length - 1; i >= 0; i--) {
      control1.removeAt(i);
    }
  }

  private removeAllReviewDiplomaInfo() {
    const control1 = this.allReviewDiplomaRows;
    for ( let i = control1.length - 1; i >= 0; i--) {
      control1.removeAt(i);
    }
  }

  private removeAllReviewInterestInfo() {
    const control1 = this.allReviewInterestRows;
    for ( let i = control1.length - 1; i >= 0; i--) {
      control1.removeAt(i);
    }
  }

  private removeAllReviewChildrenInfo() {
    const control1 = this.allReviewChildrenRows;
    for ( let i = control1.length - 1; i >= 0; i--) {
      control1.removeAt(i);
    }
  }

  private removeAllDegreeInfo() {
    const control1 = this.allDegreeRows;
    for ( let i = control1.length - 1; i >= 0; i--) {
      control1.removeAt(i);
    }
    this.addDegreeRow();
  }

  private removeAllInterestInfo() {
    const control = this.allInterestRows;
    for ( let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }
    this.addInterestRow();
  }

  private nextStep(stepper: MatStepper) {
    if ((this.personalDetails.get('civilStatus').value === 'single' && stepper.selectedIndex === 4)) {
      if (this.bHasPersonalEmail) {
        stepper.selectedIndex = 8;
      } else {
        stepper.selectedIndex = 7;
      }
    } else if (stepper.selectedIndex === 6 && this.bHasPersonalEmail) {
      stepper.selectedIndex = 8;
    } else {
      if ( (stepper.selectedIndex === 0 && this.personalDetails.invalid) ||
          (stepper.selectedIndex === 1 && this.occupationDetails.invalid) ||
          (stepper.selectedIndex === 7 && this.referenceDetails.invalid) ) {
            event.stopPropagation();
      } else {
        stepper.next();
      }
    }
  }

  private previousStep(stepper: MatStepper) {
    if (stepper.selectedIndex === 8 && this.bHasPersonalEmail) {
      if (this.personalDetails.get('civilStatus').value === 'single') {
        stepper.selectedIndex = 4;
      } else {
        stepper.selectedIndex = 6;
      }
    } else if (stepper.selectedIndex === 7) {
      if (this.personalDetails.get('civilStatus').value === 'single') {
        stepper.selectedIndex = 4;
      } else {
        stepper.selectedIndex = 6;
      }
    } else {
      stepper.previous();
    }
  }

  private onSubmit(stepper: MatStepper) {
    if (this.personalDetails.valid && this.occupationDetails.valid && this.educationalDetails.valid) {
      if (this.isAccountEmailNotEmpty()) {
        if (!this.isProvidedEmailNotValid()) {
          if (this.isAValidNic()) {
            if (this.isAValidAdmissionNo()) {
              this.membershipService.addMembership(this.membershipObj);
              alert('Successfully Submitted the Application!');
              this.getAllMemberships();
              this.resetFormFields(stepper);
            } else {
              alert('The admission number you provided is already used by some other member.' +
                          'Please provide your correct admission number.');
            }
          } else {
            alert('The NIC number you provided is already used by some other member. Please provide the correct NIC number');
          }
        } else {
          alert('The personal or reference Email you provided is already used by some other member. Please provide a different Email.');
        }
      } else {
        alert('You must provide either a personal Email or a reference Email to get the Membership');
      }
    } else {
      alert('Invalid fields found in the application form');
    }
  }

  private isAValidNic() {
    let nicFound = false;
    if (this.personalDetails && this.personalDetails.get('nicNo')) {
      const nic = this.personalDetails.get('nicNo').value;
      if (this.memberships) {
        this.memberships.forEach(membership => {
          if (!nicFound) {
            if (membership.nicNo === nic) {
              nicFound = true;
            }
          }
        });
        return !nicFound;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private isAValidAdmissionNo() {
    let admissionFound = false;
    if (this.personalDetails && this.personalDetails.get('addmissionNo')) {
      const admissionNo = this.personalDetails.get('addmissionNo').value;
      if (this.memberships) {
        this.memberships.forEach(membership => {
          if (!admissionFound) {
            if (membership.addmissionNo === admissionNo) {
              admissionFound = true;
            }
          }
        });
        return !admissionFound;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  private isProvidedEmailNotValid() {
    let emailViolation = false;
    const newEmail =  this.getValidEmail();
    if (this.memberships) {
      this.memberships.forEach(membership => {
        if (!emailViolation) {
          if (membership.personalEmail === newEmail || membership.refEmail === newEmail) {
            emailViolation = true;
          }
        }
      });
    }
    return emailViolation;
  }

  private isAccountEmailNotEmpty() {
    let personalEmail = '';
    let refEmail = '';
    if (this.personalDetails && this.personalDetails.get('personalEmail')) {
      personalEmail = this.personalDetails.get('personalEmail').value;
    }
    if (this.referenceDetails && this.referenceDetails.get('refEmail')) {
      refEmail = this.referenceDetails.get('refEmail').value;
    }
    if ((personalEmail !== '' && personalEmail != null) || (refEmail !== '' && refEmail != null)) {
      return true;
    }
    return false;
  }

  private getValidEmail() {
    let personalEmail = '';
    let refEmail = '';
    if (this.personalDetails && this.personalDetails.get('personalEmail')) {
      personalEmail = this.personalDetails.get('personalEmail').value;
    }
    if (this.referenceDetails && this.referenceDetails.get('refEmail')) {
      refEmail = this.referenceDetails.get('refEmail').value;
    }
    if (personalEmail !== '' && personalEmail != null) {
      return personalEmail;
    } else if (refEmail !== '' && refEmail != null) {
      return refEmail;
    }
    return '';
  }

  private setDummyValues() {
    this.personalDetails.get('memberName').setValue('Asha Rathnayake');
    this.personalDetails.get('preferredName').setValue('Asha');
    this.personalDetails.get('nicNo').setValue('12345679V');
    this.personalDetails.get('memberDob').setValue(new Date());
    this.personalDetails.get('nationality').setValue('Sinhala');
    this.personalDetails.get('religion').setValue('Buddhist');
    this.personalDetails.get('addmisionDate').setValue(new Date());
    this.personalDetails.get('addmissionNo').setValue('8313');
    this.personalDetails.get('leavingDate').setValue(new Date());
    this.personalDetails.get('registrationDate').setValue(new Date());
    this.personalDetails.get('receiptNo').setValue('03439A');
    this.personalDetails.get('homeAddress').setValue('Colombo 6');
    this.personalDetails.get('homeTel').setValue('0112378244');
    this.personalDetails.get('mobileNo').setValue('0771234567');
    this.personalDetails.get('civilStatus').setValue('single');
    if (this.personalDetails.get('memberOccup')) {
      this.personalDetails.get('memberOccup').setValue('Doctor');
    }
    if (this.personalDetails.get('memberWorkArea')) {
      this.personalDetails.get('memberWorkArea').setValue('Health Care');
    }
    if (this.occupationDetails.get('memberEmployer')) {
      this.occupationDetails.get('memberEmployer').setValue('Gov');
    }
    if ( this.occupationDetails.get('memberWorkAddress')) {
      this.occupationDetails.get('memberWorkAddress').setValue('Colombo');
    }
    if (this.educationalDetails.get('olYear')) {
      this.educationalDetails.get('olYear').setValue('2006');
    }
    if (this.educationalDetails.get('alYear')) {
      this.educationalDetails.get('alYear').setValue('2009');
    }
  }

  private copyFormControl(control: AbstractControl) {
    if (control instanceof FormControl) {
        return new FormControl(control.value);
    } else if (control instanceof FormGroup) {
        const copy = new FormGroup({});
        Object.keys(control.getRawValue()).forEach(key => {
            copy.addControl(key, this.copyFormControl(control.controls[key]));
        });
        return copy;
    } else if (control instanceof FormArray) {
        const copy = new FormArray([]);
        control.controls.forEach(ctrl => {
            copy.push(this.copyFormControl(ctrl));
        });
        return copy;
    }
  }

  private isEmptyCollection(control: AbstractControl) {
    if (control instanceof FormControl) {
        return (control.value === '' || control.value == null) ? true : false;
    } else if (control instanceof FormGroup) {
        let isEmpty = false;
        let hasValue = false;
        Object.keys(control.getRawValue()).forEach(key => {
          if (!hasValue) {
            isEmpty = this.isEmptyCollection(control.controls[key]);
            if (!isEmpty) {
              hasValue = true;
            }
          }
        });
        return isEmpty;
    } else if (control instanceof FormArray) {
        let isEmpty = false;
        control.controls.forEach(ctrl => {
          if (!isEmpty) {
            isEmpty = this.isEmptyCollection(ctrl);
          }
        });
        if (isEmpty) {
          return true;
        } else {
          return false;
        }
    }
  }

  private getDegreeRowArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: DegreeObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new DegreeObject();
      newRowsArray[_index].degreeProgram = formGroup.get('degreeProgram').value;
      newRowsArray[_index].university = formGroup.get('university').value;
      newRowsArray[_index].degreeYear = formGroup.get('Degreeyear').value;
      _index++;
    });
    return newRowsArray;
  }

  private getInterestRowArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: InterestObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new InterestObject();
      newRowsArray[_index].interestType = formGroup.get('interestType').value;
      newRowsArray[_index].interestDesc = formGroup.get('interestDesc').value;
      _index++;
    });
    return newRowsArray;
  }

  private getOtherRowArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: OtherObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new OtherObject();
      newRowsArray[_index].diplomaName = formGroup.get('diplomaName').value;
      newRowsArray[_index].institute = formGroup.get('institute').value;
      newRowsArray[_index].diplomaYear = formGroup.get('diplomaYear').value;
      _index++;
    });
    return newRowsArray;
  }

  private getChildRowArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: ChildObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new ChildObject();
      newRowsArray[_index].childName = formGroup.get('childName').value;
      newRowsArray[_index].childDob = formGroup.get('childDob').value;
      newRowsArray[_index].childSchool = formGroup.get('childSchool').value;
      _index++;
    });
    return newRowsArray;
  }

  get allDegreeRows() {
    return this.educationalDetails.get('degreeDetails') as FormArray;
  }

  get allDiplomaRows() {
    return this.otherDetails.get('otherQualif') as FormArray;
  }

  get allInterestRows() {
    return this.interestDetails.get('interests') as FormArray;
  }

  get allChildrenRows() {
    return this.childrenDetails.get('childrenInfo') as FormArray;
  }

  get allReviewDegreeRows() {
    return this.reviewEducation.get('degreeDetails') as FormArray;
  }

  get allReviewDiplomaRows() {
    return this.reviewOther.get('otherQualif') as FormArray;
  }

  get allReviewInterestRows() {
    return this.reviewInterests.get('interests') as FormArray;
  }

  get allReviewChildrenRows() {
    return this.reviewChildren.get('childrenInfo') as FormArray;
  }

}

class MembershipObject implements Membership {
  _id: string;
  dataType: string;
  memberName: string;
  preferredName: string;
  nicNo: string;
  memberId: string;
  approvalChange: string;
  memberDob: string;
  nationality: string;
  religion: string;
  addmisionDate: string;
  addmissionNo: string;
  leavingDate: string;
  registrationDate: string;
  receiptNo: string;
  civilStatus: string;
  childrenCount: number;
  homeAddress: string;
  homeTel: string;
  mobileNo: string;
  personalEmail: string;
  memberOccup: string;
  memberWorkArea: string;
  memberEmployer: string;
  memberWorkAddress: string;
  memberWorkTel: string;
  memberWorkEmail: string;
  olYear: string;
  alYear: string;
  degreeDetails: Degree [];
  otherQualif: OtherEducation [];
  interests: Interest [];
  spouseName: string;
  spouseDOB: string;
  spouseNic: string;
  spouseOccup: string;
  spouseWorkArea: string;
  spouseWorkAddress: string;
  spouseWorkTel: string;
  spouseEmail: string;
  childrenInfo: Child[];
  refName: string;
  refEmail: string;

  constructor() { }
}

class DegreeObject implements Degree {
  degreeProgram: string;
  university: string;
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

