import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { MatSelectChange, MatStepper } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AdmissionModel, Student, OtherAchievement, Leadership, ExtraCurricularActivity,
         Championship, Other, EducationAchievement, Service, Letter, Donation, Committee } from '../admission.model';
import { AdmissionService } from '../admission.service';
import { MembershipService } from '../../user-profile/user-profile.service';
import { Membership, Degree, OtherEducation, Interest, Child } from '../../new-membership/membership/membership.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-new-admission',
  templateUrl: './new-admission.component.html',
  styleUrls: ['./new-admission.component.css']
})
export class NewAdmissionComponent implements OnInit, OnDestroy {
  inputParam: string;
  admissionAction: string;
  private sub: Subscription;
  admissionObject: AdmissionApplication = new AdmissionApplication;
  memberProfile: Membership = new MembershipObject();
  bCurrentStudents = false;
  currentStudentCount = 0;
  basicDetails: FormGroup;
  educationalDetails: FormGroup;
  extraCurricularDetails: FormGroup;
  afterSchoolDetails: FormGroup;
  reviewBasic: FormGroup;
  reviewEducational: FormGroup;
  reviewExtraCurr: FormGroup;
  reviewAfterSchool: FormGroup;
  reviewDetails: FormGroup;
  reviewArray: any;
  stepHeading: any = '';
  bStep1: any;
  bStep2: any;
  bStep3: any;
  bStep4: any;
  bDegreeDetails: any;
  bServicesOffered: any;
  bOgaCategory: any;
  bEnable = true;
  sessionMember: any;
  stepTitles: any = [
    'Basic Details',
    'Educational Achievements',
    'Extra Curricular Activities',
    'After the School Periods'
  ];
  private olColumns: string[] = ['result', 'count'];

  constructor(
    private _formBuilder: FormBuilder,
    private admissionService: AdmissionService,
    private membershipService: MembershipService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.bOgaCategory = false;
    // get the logged member's memberId from session storage
    this.sessionMember = sessionStorage.getItem('id');
    const years = '[0-9]{1,2}';
    this.stepHeading = this.stepTitles[0];
    // initializes the form group objects
    this.basicDetails = this._formBuilder.group({
      applicantName: ['', Validators.required],
      applicantDob: ['', Validators.required],
      contactNo: ['', Validators.required],
      memberOccupation: ['', Validators.required],
      spouseName: ['', Validators.required],
      spouseOccupation: [''],
      currentStudents: ['', Validators.required],
      currentStudentsArray: this._formBuilder.array([
        this.newCurrentStudentInfo()
      ]),
      coCategory: [''],
      ogaCategory: [''],
      sisterCategory: [''],
      educationServiceCategory: [''],
      transferCategory: [''],
      foreignCategory: [''],
      armedForces: ['']
    });
    this.educationalDetails = this._formBuilder.group({
      schoolYears: ['', [Validators.pattern(years)]],
      scholarship: ['', Validators.required],
      olA: [''],
      olB: [''],
      olC: [''],
      olS: [''],
      alSub1: [''],
      alSub1Result: [''],
      alSub2: [''],
      alSub2Result: [''],
      alSub3: [''],
      alSub3Result: [''],
      alSub4: [''],
      alSub4Result: [''],
      otherAchievements: this._formBuilder.array([
        this.newOtherAchievementInfo()
      ]),
    });
    this.extraCurricularDetails = this._formBuilder.group({
      leaderships: this._formBuilder.array([
        this.newLeadershipInfo()
      ]),
      extraCurricularDetails: this._formBuilder.array([
        this.newExtraCurricularInfo()
      ]),
      championships: this._formBuilder.array([
        this.newChampionshipsInfo()
      ]),
      others: this._formBuilder.array([
        this.newOtherInfo()
      ])
    });
    this.afterSchoolDetails = this._formBuilder.group({
      membershipId:  ['', Validators.required],
      membershipDate: [''],
      membershipYears: [''],
      servicesOffered: [''],
      educationAchievements: this._formBuilder.array([
        this.newEducationalAchievementInfo()
      ]),
      services: this._formBuilder.array([
        this.newServiceInfo()
      ]),
      letters: this._formBuilder.array([
        this.newLetterInfo()
      ]),
      donations: this._formBuilder.array([
        this.newDonationInfo()
      ]),
      committee:  this._formBuilder.array([
        this.newCommitteeInfo()
      ])
    });
    // get routing parameters from the url
    this.sub = this.route.params.subscribe(params => {
      this.inputParam = params['param'];
      if (this.inputParam) {
        if (this.inputParam === 'new') {
          this.admissionAction = 'insert';
          this.getLoggedUserInfo();
        } else {
          this.admissionAction = 'update';
          this.getExistingAdmission();
        }
      } else {
        this.admissionAction = 'insert';
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // get the logged user member profile
  private getLoggedUserInfo() {
    if (this.sessionMember != null || this.sessionMember !== '') {
        this.membershipService.getMembershipByMemberId(this.sessionMember).subscribe( (data: Membership) => {
          if (data) {
            this.memberProfile = data;
            this.setFormValues();
          }
        });
    } else {
      this.memberProfile = new MembershipObject();
    }
  }

  // load the relevant admission data
  private getExistingAdmission() {
    this.admissionService.getAdmission(this.inputParam).subscribe((data: AdmissionApplication) => {
      if (data) {
        this.admissionObject = data;
        this.setAdmissionInformation();
      }
    });
  }

  // set an existing admission form data into the form fields
  private setAdmissionInformation() {
    let control: any;
    this.basicDetails.get('applicantName').setValue(this.admissionObject.applicantName);
    this.basicDetails.get('applicantDob').setValue(this.admissionObject.applicantDob);
    this.basicDetails.get('contactNo').setValue(this.admissionObject.contactNo);
    this.basicDetails.get('memberOccupation').setValue(this.admissionObject.memberOccupation);
    this.basicDetails.get('spouseName').setValue(this.admissionObject.spouseName);
    this.basicDetails.get('spouseOccupation').setValue(this.admissionObject.spouseOccupation);
    this.afterSchoolDetails.get('membershipId').setValue(this.admissionObject.membershipId);
    this.afterSchoolDetails.get('membershipDate').setValue(this.admissionObject.membershipDate);
    this.afterSchoolDetails.get('membershipYears').setValue(this.admissionObject.membershipYears);
    if (this.admissionObject.currentStudentsArray) {
      control = this.currentStudentRows;
      control.removeAt(0);
      this.bCurrentStudents = true;
      this.basicDetails.get('currentStudents').setValue(this.admissionObject.currentStudents);
      this.currentStudentCount = this.admissionObject.currentStudentsArray.length;
      this.admissionObject.currentStudentsArray.forEach((student: StudentObject) => {
        control.push(this.existingCurrentStudentInfo(student));
      });
    }
    this.basicDetails.get('coCategory').setValue(this.admissionObject.coCategory);
    this.basicDetails.get('ogaCategory').setValue(this.admissionObject.ogaCategory);
    this.basicDetails.get('sisterCategory').setValue(this.admissionObject.sisterCategory);
    this.basicDetails.get('educationServiceCategory').setValue(this.admissionObject.educationServiceCategory);
    this.basicDetails.get('transferCategory').setValue(this.admissionObject.transferCategory);
    this.basicDetails.get('foreignCategory').setValue(this.admissionObject.foreignCategory);
    this.basicDetails.get('armedForces').setValue(this.admissionObject.armedForces);
    this.educationalDetails.get('schoolYears').setValue(this.admissionObject.schoolYears);
    this.educationalDetails.get('scholarship').setValue(this.admissionObject.scholarship);
    this.educationalDetails.get('olA').setValue(this.admissionObject.olA);
    this.educationalDetails.get('olB').setValue(this.admissionObject.olB);
    this.educationalDetails.get('olC').setValue(this.admissionObject.olC);
    this.educationalDetails.get('olS').setValue(this.admissionObject.olS);
    this.educationalDetails.get('alSub1').setValue(this.admissionObject.alSub1);
    this.educationalDetails.get('alSub1Result').setValue(this.admissionObject.alSub1Result);
    this.educationalDetails.get('alSub2').setValue(this.admissionObject.alSub2);
    this.educationalDetails.get('alSub2Result').setValue(this.admissionObject.alSub2Result);
    this.educationalDetails.get('alSub3').setValue(this.admissionObject.alSub3);
    this.educationalDetails.get('alSub3Result').setValue(this.admissionObject.alSub3Result);
    this.educationalDetails.get('alSub4').setValue(this.admissionObject.alSub4);
    this.educationalDetails.get('alSub4Result').setValue(this.admissionObject.alSub4Result);
    // copy array information into the form arrays
    if (this.admissionObject.otherAchievements) {
      control = this.otherAchievementRows;
      control.removeAt(0);
      this.admissionObject.otherAchievements.forEach((achievement: OtherAchievementObj) => {
        control.push(this.existingOtherAchievementInfo(achievement));
      });
    }
    if (this.admissionObject.leaderships) {
      control = this.leadershipRows;
      control.removeAt(0);
      this.admissionObject.leaderships.forEach((leadership: LeadershipObject) => {
        control.push(this.existingLeadershipInfo(leadership));
      });
    }
    if (this.admissionObject.extraCurricularDetails) {
      control = this.extraCurricularRows;
      control.removeAt(0);
      this.admissionObject.extraCurricularDetails.forEach((extra: ExtraCurricularActivityObject) => {
        control.push(this.existingExtraCurricularInfo(extra));
      });
    }
    if (this.admissionObject.championships) {
      control = this.championshipRows;
      control.removeAt(0);
      this.admissionObject.championships.forEach((championship: ChampionshipObject) => {
        control.push(this.existingChampionshipsInfo(championship));
      });
    }
    if (this.admissionObject.others) {
      control = this.otherRows;
      control.removeAt(0);
      this.admissionObject.others.forEach((other: OtherObject) => {
        control.push(this.existingOtherInfo(other));
      });
    }
    if (this.admissionObject.educationAchievements) {
      control = this.educationQualificationRows;
      control.removeAt(0);
      this.admissionObject.educationAchievements.forEach((eduAchievement: EducationAchievementObject) => {
        control.push(this.existingEducationalAchievementInfo(eduAchievement));
      });
    }
    this.afterSchoolDetails.get('servicesOffered').setValue(this.admissionObject.servicesOffered);
    if (this.admissionObject.servicesOffered === 'yes') {
      this.bServicesOffered = true;
    }
    if (this.admissionObject.letters) {
      control = this.letterRows;
      control.removeAt(0);
      this.admissionObject.letters.forEach((letter: LetterObject) => {
        control.push(this.existingLetterInfo(letter));
      });
    }
    if (this.admissionObject.services) {
      control = this.serviceRows;
      control.removeAt(0);
      this.admissionObject.services.forEach((service: ServiceObject) => {
        control.push(this.existingServiceInfo(service));
      });
    }
    if (this.admissionObject.donations) {
      control = this.donationRows;
      control.removeAt(0);
      this.admissionObject.donations.forEach((donation: DonationObject) => {
        control.push(this.existingDonationInfo(donation));
      });
    }
    if (this.admissionObject.committee) {
      control = this.committeeRows;
      control.removeAt(0);
      this.admissionObject.committee.forEach((committee: CommitteeObject) => {
        control.push(this.existingCommitteeInfo(committee));
      });
    }
    // validates the admission status and disable feilds if the admission is not in pending status
    if (this.admissionObject.status !== 'Pending') {
      this.basicDetails.disable();
      this.educationalDetails.disable();
      this.extraCurricularDetails.disable();
      this.afterSchoolDetails.disable();
      this.bEnable = false;
    }
  }

  // set the loaded member profile values into the form fields
  private setFormValues() {
    this.basicDetails.get('ogaCategory').setValue(true);
    this.admissionObject.memberId = this.memberProfile.memberId;
    this.basicDetails.get('applicantName').setValue(this.memberProfile.memberName);
    this.basicDetails.get('applicantDob').setValue(this.memberProfile.memberDob);
    this.basicDetails.get('contactNo').setValue(this.memberProfile.mobileNo);
    this.basicDetails.get('memberOccupation').setValue(this.memberProfile.memberOccup);
    this.basicDetails.get('spouseName').setValue(this.memberProfile.spouseName);
    this.basicDetails.get('spouseOccupation').setValue(this.memberProfile.spouseOccup);
    this.afterSchoolDetails.get('membershipId').setValue(this.memberProfile.memberId);
    this.afterSchoolDetails.get('membershipDate').setValue(this.memberProfile.registrationDate);
  }

  onCurrentStudentsChange($event: MatSelectChange) {
    if ( $event.value === 'yes' ) {
      this.bCurrentStudents = true;
    } else {
      this.bCurrentStudents = false;
      this.removeAllStudentInfo();
    }
  }

  onServicesOfferedChange($event: MatSelectChange) {
    if ( $event.value === 'yes' ) {
      this.bServicesOffered = true;
    } else {
      this.bServicesOffered = false;
      this.removeAllServiceInfo();
    }
  }

  private removeAllStudentInfo() {
    const control = this.currentStudentRows;
    if (!this.isEmptyCollection(this.basicDetails.get('currentStudentsArray'))) {
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewStudentRow();
    }
  }

  private removeAllOtherAchievementInfo() {
    if (!this.isEmptyCollection(this.educationalDetails.get('otherAchievements'))) {
      const control = this.otherAchievementRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewOtherAchievementRow();
    }
  }

  private removeAllLeadershipInfo() {
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('leaderships'))) {
      const control = this.leadershipRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewLeadershipRow();
    }
  }

  private removeAllExtraCurrisularInfo() {
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('extraCurricularDetails'))) {
      const control = this.extraCurricularRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewExtraCurricularRow();
    }
  }

  private removeAllChampionshipsInfo() {
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('championships'))) {
      const control = this.championshipRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewChampionshipRow();
    }
  }

  private removeAllServiceInfo() {
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('services'))) {
      const control = this.serviceRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewServiceRow();
    }
  }

  private removeAllOtherInfo() {
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('others'))) {
      const control = this.otherRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewEducationalAchievementRow();
    }
  }

  private removeAllEducationalAchievementInfo() {
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('educationAchievements'))) {
      const control = this.educationQualificationRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewEducationalAchievementRow();
    }
  }

  private removeAllLetterInfo() {
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('letters'))) {
      const control = this.letterRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewLetterRow();
    }
  }

  private removeAllDonationInfo() {
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('donations'))) {
      const control = this.donationRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewDonationRow();
    }
  }

  private removeAllCommitteeInfo() {
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('committee'))) {
      const control = this.committeeRows;
      for ( let i = control.length - 1; i >= 0; i--) {
        control.removeAt(i);
      }
      this.addNewCommitteeRow();
    }
  }

  private getCurrentStudentsCount() {
    if (this.basicDetails) {
      if (this.currentStudentRows.length === 0) {
        this.currentStudentCount = 1;
      } else {
        this.currentStudentCount += 1;
      }
    } else {
      this.currentStudentCount = 1;
    }
    return this.currentStudentCount;
  }

  private newCurrentStudentInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      student: ['Student ' + this.getCurrentStudentsCount()],
      admissionYear: ['', Validators.pattern(yearPatern)],
      grade: ['']
    });
  }

  private existingCurrentStudentInfo(student: StudentObject) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      student: [student.student],
      admissionYear: [student.admissionYear, Validators.pattern(yearPatern)],
      grade: [student.grade]
    });
  }

  private newOtherAchievementInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      achievement: [''],
      year: ['', Validators.pattern(yearPatern)]
    });
  }

  private existingOtherAchievementInfo(achievement: OtherAchievementObj) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      achievement: [achievement.achievement],
      year: [achievement.year, Validators.pattern(yearPatern)]
    });
  }

  private newLeadershipInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      lType: [''],
      description: [''],
      year: ['', Validators.pattern(yearPatern)]
    });
  }

  private existingLeadershipInfo(leadership: LeadershipObject) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      lType: [leadership.lType],
      description: [leadership.description],
      year: [leadership.year, Validators.pattern(yearPatern)]
    });
  }

  private newExtraCurricularInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      eType: [''],
      description: [''],
      position: [''],
      other: [''],
      year: ['', Validators.pattern(yearPatern)]
    });
  }

  private existingExtraCurricularInfo(extraCurr: ExtraCurricularActivityObject) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      eType: [extraCurr.eType],
      description: [extraCurr.description],
      position: [extraCurr.position],
      other: [extraCurr.other],
      year: [extraCurr.year, Validators.pattern(yearPatern)]
    });
  }

  private newChampionshipsInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      cType: [''],
      description: [''],
      place: [''],
      year: ['', Validators.pattern(yearPatern)]
    });
  }

  private existingChampionshipsInfo( chmp: ChampionshipObject) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      cType: [chmp.cType],
      description: [chmp.description],
      place: [chmp.place],
      year: [chmp.year, Validators.pattern(yearPatern)]
    });
  }

  private newOtherInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      description: [''],
      year: ['', Validators.pattern(yearPatern)]
    });
  }

  private existingOtherInfo(other: OtherObject) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      description: [other.description],
      year: [other.year, Validators.pattern(yearPatern)]
    });
  }

  private newEducationalAchievementInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      eType: [''],
      qualification: [''],
      year: ['', Validators.pattern(yearPatern)]
    });
  }

  private existingEducationalAchievementInfo(eduAchievement: EducationAchievementObject) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      eType: [eduAchievement.eType],
      qualification: [eduAchievement.qualification],
      year: [eduAchievement.year, Validators.pattern(yearPatern)]
    });
  }

  private newServiceInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      description: [''],
      year: ['', Validators.pattern(yearPatern)]
    });
  }

  private existingServiceInfo(service: ServiceObject) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      description: [service.description],
      year: [service.year, Validators.pattern(yearPatern)]
    });
  }

  private newLetterInfo() {
    const numberPatern = '[0-9][0-9][0-9]';
    return this._formBuilder.group({
      lType: [''],
      letterNo: [''],
      description: ['']
    });
  }

  private existingLetterInfo(letter: LetterObject) {
    const numberPatern = '[0-9][0-9][0-9]';
    return this._formBuilder.group({
      lType: [letter.lType],
      letterNo: [letter.letterNo],
      description: [letter.description]
    });
  }

  private newDonationInfo() {
    const currencyPatern = '[0-9]+';
    return this._formBuilder.group({
      receiptNo: [''],
      total: ['', Validators.pattern(currencyPatern)]
    });
  }

  private existingDonationInfo(donation: DonationObject) {
    const currencyPatern = '[0-9]+';
    return this._formBuilder.group({
      receiptNo: [donation.receiptNo],
      total: [donation.total, Validators.pattern(currencyPatern)]
    });
  }

  private newCommitteeInfo() {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      post: [''],
      year: ['', Validators.pattern(yearPatern)]
    });
  }

  private existingCommitteeInfo(committee: CommitteeObject) {
    const yearPatern = '[0-9][0-9][0-9][0-9]';
    return this._formBuilder.group({
      post: [committee.post],
      year: [committee.year, Validators.pattern(yearPatern)]
    });
  }

  removeCurrentStudentRow(index: number) {
    const control = this.currentStudentRows;
    control.removeAt(index);
    this.currentStudentCount--;
    for (let i = 0; i < this.currentStudentRows.length; i++) {
      control.controls[i].get('student').setValue('Student ' + (i + 1));
    }
  }

  removeOtherAchievementRow(index: number) {
    const control = this.otherAchievementRows;
    control.removeAt(index);
  }

  removeLeadershipRow(index: number) {
    const control = this.leadershipRows;
    control.removeAt(index);
  }

  removeExtraCurricularRow(index: number) {
    const control = this.extraCurricularRows;
    control.removeAt(index);
  }

  removeChampionshipRow(index: number) {
    const control = this.championshipRows;
    control.removeAt(index);
  }

  removeOtherRow(index: number) {
    const control = this.otherRows;
    control.removeAt(index);
  }

  removeEducationQualificationRow(index: number) {
    const control = this.educationQualificationRows;
    control.removeAt(index);
  }

  removeServiceRow(index: number) {
    const control = this.serviceRows;
    control.removeAt(index);
  }

  removeLetterRow(index: number) {
    const control = this.letterRows;
    control.removeAt(index);
  }

  removeDonationRow(index: number) {
    const control = this.donationRows;
    control.removeAt(index);
  }

  removeCommitteeRow(index: number) {
    const control = this.committeeRows;
    control.removeAt(index);
  }

  get currentStudentRows() {
    return this.basicDetails.get('currentStudentsArray') as FormArray;
  }

  get otherAchievementRows() {
    return this.educationalDetails.get('otherAchievements') as FormArray;
  }

  get leadershipRows() {
    return this.extraCurricularDetails.get('leaderships') as FormArray;
  }

  get extraCurricularRows() {
    return this.extraCurricularDetails.get('extraCurricularDetails') as FormArray;
  }

  get championshipRows() {
    return this.extraCurricularDetails.get('championships') as FormArray;
  }

  get otherRows() {
    return this.extraCurricularDetails.get('others') as FormArray;
  }

  get educationQualificationRows() {
    return this.afterSchoolDetails.get('educationAchievements') as FormArray;
  }

  get serviceRows() {
    return this.afterSchoolDetails.get('services') as FormArray;
  }

  get letterRows() {
    return this.afterSchoolDetails.get('letters') as FormArray;
  }

  get donationRows() {
    return this.afterSchoolDetails.get('donations') as FormArray;
  }

  get committeeRows() {
    return this.afterSchoolDetails.get('committee') as FormArray;
  }

  addNewStudentRow() {
    const control = this.currentStudentRows;
    control.push(this.newCurrentStudentInfo());
  }

  addNewOtherAchievementRow() {
    const control = this.otherAchievementRows;
    control.push(this.newOtherAchievementInfo());
  }

  addNewLeadershipRow() {
    const control = this.leadershipRows;
    control.push(this.newLeadershipInfo());
  }

  addNewExtraCurricularRow() {
    const control = this.extraCurricularRows;
    control.push(this.newExtraCurricularInfo());
  }

  addNewChampionshipRow() {
    const control = this.championshipRows;
    control.push(this.newChampionshipsInfo());
  }

  addNewEducationalAchievementRow() {
    const control = this.educationQualificationRows;
    control.push(this.newEducationalAchievementInfo());
  }

  addNewServiceRow() {
    const control = this.serviceRows;
    control.push(this.newServiceInfo());
  }

  addNewLetterRow() {
    const control = this.letterRows;
    control.push(this.newServiceInfo());
  }

  addNewDonationRow() {
    const control = this.donationRows;
    control.push(this.newDonationInfo());
  }

  addNewCommitteeRow() {
    const control = this.committeeRows;
    control.push(this.newCommitteeInfo());
  }

  private previousStep(stepper: MatStepper) {
      stepper.previous();
  }

  private nextStep(stepper: MatStepper) {
    stepper.next();
  }
  private resetFormFields(stepper: MatStepper) {
    stepper.reset();
    this.removeAllChampionshipsInfo();
    this.removeAllCommitteeInfo();
    this.removeAllDonationInfo();
    this.removeAllEducationalAchievementInfo();
    this.removeAllExtraCurrisularInfo();
    this.removeAllLeadershipInfo();
    this.removeAllLetterInfo();
    this.removeAllOtherAchievementInfo();
    this.removeAllOtherAchievementInfo();
    this.removeAllOtherInfo();
    this.removeAllServiceInfo();
    this.removeAllStudentInfo();
    this.reviewAfterSchool = null;
    this.reviewBasic = null;
    this.reviewDetails = null;
    this.reviewEducational = null;
    this.reviewExtraCurr = null;
  }

  onStepperChange($event: StepperSelectionEvent) {
    this.stepHeading = this.stepTitles[$event.selectedIndex];
    if ($event.previouslySelectedIndex === 0) {
      this.onStepOneNext();
    } else if ($event.previouslySelectedIndex === 1) {
      this.onStepTwoNext();
    } else if ($event.previouslySelectedIndex === 2) {
      this.onStepThreeNext();
    } else if ($event.previouslySelectedIndex === 3) {
      this.onStepFourNext();
    }
  }

  private onStepOneNext() {
    this.reviewBasic = <FormGroup> this.copyFormControl (this.basicDetails);
    this.reviewBasic.disable();
    this.admissionObject.applicantName = (this.basicDetails.get('applicantName').value) ? this.basicDetails.get('applicantName').value : '';
    this.admissionObject.applicantDob  = (this.basicDetails.get('applicantDob').value) ? this.basicDetails.get('applicantDob').value : '';
    this.admissionObject.contactNo = (this.basicDetails.get('contactNo').value) ? this.basicDetails.get('contactNo').value : '';
    this.admissionObject.memberOccupation = (this.basicDetails.get('memberOccupation').value) ?
                                            this.basicDetails.get('memberOccupation').value : '';
    this.admissionObject.spouseName = (this.basicDetails.get('spouseName').value) ? this.basicDetails.get('spouseName').value : '';
    this.admissionObject.spouseOccupation  = (this.basicDetails.get('spouseOccupation').value) ?
                                              this.basicDetails.get('spouseOccupation').value : '';
    this.admissionObject.currentStudents  = (this.basicDetails.get('currentStudents').value) ?
                                              this.basicDetails.get('currentStudents').value : '';
    if (this.basicDetails.get('currentStudents').value === 'yes' &&
        !this.isEmptyCollection(this.educationalDetails.get('currentStudentsArray'))) {
      this.admissionObject.currentStudentsArray = this.getStudentRowArray(this.basicDetails.get('currentStudentsArray'));
    } else {
      this.admissionObject.currentStudentsArray = null;
    }
    this.admissionObject.coCategory = this.basicDetails.get('coCategory').value;
    this.admissionObject.ogaCategory = this.basicDetails.get('ogaCategory').value;
    this.admissionObject.sisterCategory = this.basicDetails.get('sisterCategory').value;
    this.admissionObject.educationServiceCategory = this.basicDetails.get('educationServiceCategory').value;
    this.admissionObject.transferCategory = this.basicDetails.get('transferCategory').value;
    this.admissionObject.foreignCategory = this.basicDetails.get('foreignCategory').value;
    this.admissionObject.armedForces = this.basicDetails.get('armedForces').value;
  }

  private onStepTwoNext() {
    this.reviewEducational = <FormGroup> this.copyFormControl (this.educationalDetails);
    this.reviewEducational.disable();
    this.admissionObject.schoolYears = (this.educationalDetails.get('schoolYears').value) ?
                                          this.educationalDetails.get('schoolYears').value : '';
    this.admissionObject.scholarship = (this.educationalDetails.get('scholarship').value) ?
                                          this.educationalDetails.get('scholarship').value : '';
    this.admissionObject.olA = (this.educationalDetails.get('olA').value) ?
                                          this.educationalDetails.get('olA').value : '';
    this.admissionObject.olB = (this.educationalDetails.get('olB').value) ?
                                          this.educationalDetails.get('olB').value : '';
    this.admissionObject.olC = (this.educationalDetails.get('olC').value) ?
                                          this.educationalDetails.get('olC').value : '';
    this.admissionObject.olS = (this.educationalDetails.get('olS').value) ?
                                          this.educationalDetails.get('olS').value : '';
    this.admissionObject.alSub1 = (this.educationalDetails.get('alSub1').value) ?
                                          this.educationalDetails.get('alSub1').value : '';
    this.admissionObject.alSub1Result = (this.educationalDetails.get('alSub1Result').value) ?
                                          this.educationalDetails.get('alSub1Result').value : '';
    this.admissionObject.alSub2 = (this.educationalDetails.get('alSub2').value) ?
                                          this.educationalDetails.get('alSub2').value : '';
    this.admissionObject.alSub2Result = (this.educationalDetails.get('alSub2Result').value) ?
                                          this.educationalDetails.get('alSub2Result').value : '';
    this.admissionObject.alSub3 = (this.educationalDetails.get('alSub3').value) ?
                                          this.educationalDetails.get('alSub3').value : '';
    this.admissionObject.alSub3Result = (this.educationalDetails.get('alSub3Result').value) ?
                                          this.educationalDetails.get('alSub3Result').value : '';
    this.admissionObject.alSub4 = (this.educationalDetails.get('alSub4').value) ?
                                          this.educationalDetails.get('alSub4').value : '';
    this.admissionObject.alSub4Result = (this.educationalDetails.get('alSub4Result').value) ?
                                          this.educationalDetails.get('alSub4Result').value : '';
    if (!this.isEmptyCollection(this.educationalDetails.get('otherAchievements'))) {
      this.admissionObject.otherAchievements = this.getOtherAchievementsArray(this.educationalDetails.get('otherAchievements'));
    } else {
      this.admissionObject.otherAchievements = null;
    }
  }

  private onStepThreeNext() {
    this.reviewExtraCurr = <FormGroup> this.copyFormControl (this.extraCurricularDetails);
    this.reviewExtraCurr.disable();
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('leaderships'))) {
      this.admissionObject.leaderships = this.getLeadershipsArray(this.extraCurricularDetails.get('leaderships'));
    } else {
      this.admissionObject.leaderships = null;
    }
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('extraCurricularDetails'))) {
      this.admissionObject.extraCurricularDetails =
                                  this.getExtraCurricularDetailsArray(this.extraCurricularDetails.get('extraCurricularDetails'));
    } else {
      this.admissionObject.extraCurricularDetails = null;
    }
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('championships'))) {
      this.admissionObject.championships = this.getChampionshipsArray(this.extraCurricularDetails.get('championships'));
    } else {
      this.admissionObject.championships = null;
    }
    if (!this.isEmptyCollection(this.extraCurricularDetails.get('others'))) {
      this.admissionObject.others = this.getOtherArray(this.extraCurricularDetails.get('others'));
    } else {
      this.admissionObject.others = null;
    }
  }

  private onStepFourNext() {
    this.admissionObject.membershipId = (this.afterSchoolDetails.get('membershipId').value) ?
                                          this.afterSchoolDetails.get('membershipId').value : '';
    this.admissionObject.membershipDate = (this.afterSchoolDetails.get('membershipDate').value) ?
                                          this.afterSchoolDetails.get('membershipDate').value : '';
    this.admissionObject.membershipYears = (this.afterSchoolDetails.get('membershipYears').value) ?
                                          this.afterSchoolDetails.get('membershipYears').value : '';
    this.admissionObject.servicesOffered = (this.afterSchoolDetails.get('servicesOffered').value) ?
                                          this.afterSchoolDetails.get('servicesOffered').value : '';
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('educationAchievements'))) {
      this.admissionObject.educationAchievements =
                    this.getEducationAchievementArray(this.afterSchoolDetails.get('educationAchievements'));
    } else {
      this.admissionObject.educationAchievements = null;
    }
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('services'))) {
      this.admissionObject.services =
                                  this.getServiceArray(this.afterSchoolDetails.get('services'));
    } else {
      this.admissionObject.services = null;
    }
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('letters'))) {
      this.admissionObject.letters = this.getLetterArray(this.afterSchoolDetails.get('letters'));
    } else {
      this.admissionObject.letters = null;
    }
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('donations'))) {
      this.admissionObject.donations = this.getDonationArray(this.afterSchoolDetails.get('donations'));
    } else {
      this.admissionObject.donations = null;
    }
    if (!this.isEmptyCollection(this.afterSchoolDetails.get('committee'))) {
      this.admissionObject.committee =
                    this.getCommitteeArray(this.afterSchoolDetails.get('committee'));
    } else {
      this.admissionObject.committee = null;
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

  private getStudentRowArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: StudentObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new StudentObject();
      newRowsArray[_index].student = formGroup.get('student').value;
      newRowsArray[_index].admissionYear = formGroup.get('admissionYear').value;
      newRowsArray[_index].grade = formGroup.get('grade').value;
      _index++;
    });
    return newRowsArray;
  }

  private getOtherAchievementsArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: OtherAchievementObj [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new OtherAchievementObj();
      newRowsArray[_index].achievement = formGroup.get('achievement').value;
      newRowsArray[_index].year = formGroup.get('year').value;
      _index++;
    });
    return newRowsArray;
  }

  private getLeadershipsArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: LeadershipObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new LeadershipObject();
      newRowsArray[_index].lType = formGroup.get('lType').value;
      newRowsArray[_index].description = formGroup.get('description').value;
      newRowsArray[_index].year = formGroup.get('year').value;
      _index++;
    });
    return newRowsArray;
  }

  private getExtraCurricularDetailsArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: ExtraCurricularActivityObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new ExtraCurricularActivityObject();
      newRowsArray[_index].eType = formGroup.get('eType').value;
      newRowsArray[_index].description = formGroup.get('description').value;
      newRowsArray[_index].position = formGroup.get('position').value;
      newRowsArray[_index].other = formGroup.get('other').value;
      newRowsArray[_index].year = formGroup.get('year').value;
      _index++;
    });
    return newRowsArray;
  }

  private getChampionshipsArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: ChampionshipObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new ChampionshipObject();
      newRowsArray[_index].cType = formGroup.get('cType').value;
      newRowsArray[_index].description = formGroup.get('description').value;
      newRowsArray[_index].place = formGroup.get('place').value;
      newRowsArray[_index].year = formGroup.get('year').value;
      _index++;
    });
    return newRowsArray;
  }

  private getOtherArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: OtherObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new OtherObject();
      newRowsArray[_index].description = formGroup.get('description').value;
      newRowsArray[_index].year = formGroup.get('year').value;
      _index++;
    });
    return newRowsArray;
  }

  private getEducationAchievementArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: EducationAchievementObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new EducationAchievementObject();
      newRowsArray[_index].eType = formGroup.get('eType').value;
      newRowsArray[_index].qualification = formGroup.get('qualification').value;
      newRowsArray[_index].year = formGroup.get('year').value;
      _index++;
    });
    return newRowsArray;
  }

  private getServiceArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: ServiceObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new ServiceObject();
      newRowsArray[_index].description = formGroup.get('description').value;
      newRowsArray[_index].year = formGroup.get('year').value;
      _index++;
    });
    return newRowsArray;
  }

  private getLetterArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: LetterObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new LetterObject();
      newRowsArray[_index].description = formGroup.get('description').value;
      newRowsArray[_index].lType = formGroup.get('lType').value;
      newRowsArray[_index].letterNo = formGroup.get('letterNo').value;
      _index++;
    });
    return newRowsArray;
  }

  private getDonationArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: DonationObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new DonationObject();
      newRowsArray[_index].receiptNo = formGroup.get('receiptNo').value;
      newRowsArray[_index].total = formGroup.get('total').value;
      _index++;
    });
    return newRowsArray;
  }

  private getCommitteeArray(rowArrayControl: AbstractControl) {
    const rowArray = <FormArray> rowArrayControl;
    const newRowsArray: CommitteeObject [] = new Array(rowArray.controls.length);
    let _index = 0;
    rowArray.controls.forEach(frmGroup => {
      const formGroup = <FormGroup> frmGroup;
      newRowsArray[_index] = new CommitteeObject();
      newRowsArray[_index].post = formGroup.get('post').value;
      newRowsArray[_index].year = formGroup.get('year').value;
      _index++;
    });
    return newRowsArray;
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

  onSubmit(stepper: MatStepper) {
    // check the form validations
    if (this.basicDetails.valid && this.educationalDetails.valid && this.extraCurricularDetails.valid &&
        this.afterSchoolDetails.valid && this.validOga()) {
          this.onStepFourNext();
          console.log(this.admissionObject);
          // validate the action type
          if (this.admissionAction === 'insert') {
            // send a post request to add the new item
            this.admissionService.addNewAdmission(this.admissionObject);
            alert('Successfully Submitted the Application!');
          } else {
            // send an update request to add the new item
            this.admissionService.updateAdmission(this.admissionObject);
            alert('Successfully Updated the Application!');
          }
      this.resetFormFields(stepper);
    } else {
      alert('Invalid fields found in the application form!');
    }
  }

  // validate the oga membership details if the oga category is selected
  private validOga() {
    if (this.basicDetails.get('ogaCategory').value === 'true') {
      if (this.afterSchoolDetails.get('membershipId').value == null ||
            this.afterSchoolDetails.get('membershipId').value === '') {
              return false;
            } else {
              return true;
            }
    } else {
      return true;
    }
  }
}

class AdmissionApplication implements AdmissionModel {
  _id: string;
  status: string;
  memberId: string;
  applicantName: string;
  applicantDob: string;
  contactNo: string;
  memberOccupation: string;
  spouseName: string;
  spouseOccupation: string;
  currentStudents: string;
  currentStudentsArray: Student[];
  coCategory: string;
  ogaCategory: string;
  sisterCategory: string;
  educationServiceCategory: string;
  transferCategory: string;
  foreignCategory: string;
  armedForces: string;
  schoolYears: string;
  scholarship: string;
  olA: string;
  olB: string;
  olC: string;
  olS: string;
  alSub1: string;
  alSub1Result: string;
  alSub2: string;
  alSub2Result: string;
  alSub3: string;
  alSub3Result: string;
  alSub4: string;
  alSub4Result: string;
  otherAchievements: OtherAchievement[];
  schoolYearsMarks: string;
  educationalAchievementsMarks: string;
  extraCurricularMarks: string;
  afterSchoolMarks: string;
  leaderships: LeadershipObject[];
  extraCurricularDetails: ExtraCurricularActivityObject[];
  championships: ChampionshipObject[];
  others: OtherObject[];
  membershipId: string;
  membershipDate: string;
  membershipYears: string;
  servicesOffered: string;
  educationAchievements: EducationAchievementObject[];
  services: ServiceObject[];
  letters: LetterObject[];
  donations: DonationObject[];
  committee: CommitteeObject[];

  constructor() {}

}

class StudentObject implements Student {
  student: string;
  admissionYear: string;
  grade: string;

  constructor() {}
}

class OtherAchievementObj implements OtherAchievement {
  achievement: string;
  year: string;

  constructor() {}
}

class LeadershipObject implements Leadership {
  lType: string;
  description: string;
  year: string;

  constructor() {}
}

class ExtraCurricularActivityObject implements ExtraCurricularActivity {
  eType: string;  description: string;
  position: string;
  other: string;
  year: string;

  constructor() {}
}

class ChampionshipObject implements Championship {
  cType: string;
  description: string;
  place: string;
  year: string;

  constructor() {}
}

class OtherObject implements Other {
  description: string;
  year: string;

  constructor() {}
}

class EducationAchievementObject implements EducationAchievement {
  qualification: string;
  eType: string;
  description: string;
  year: string;

  constructor() {}
}

class ServiceObject implements Service {
  description: string;
  year: string;

  constructor() {}
}

class LetterObject implements Letter {
  lType: string;
  letterNo: string;
  description: string;

  constructor() {}
}

class DonationObject implements Donation {
  receiptNo: string;
  total: string;

  constructor() {}
}

class CommitteeObject implements Committee {
  post: string;
  year: string;

  constructor() {}
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
