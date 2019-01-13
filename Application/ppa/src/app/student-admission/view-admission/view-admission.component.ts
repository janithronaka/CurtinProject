import { Component, OnInit } from '@angular/core';
import { AdmissionModel, OtherAchievement, Student, ExtraCurricularActivity, Leadership,
          Championship, EducationAchievement, Other, Service, Letter, Donation, Committee } from '../admission.model';
import { AdmissionService } from '../admission.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-admission',
  templateUrl: './view-admission.component.html',
  styleUrls: ['./view-admission.component.css']
})
export class ViewAdmissionComponent implements OnInit {
  admission: AdmissionModel;
  admissionId: string;
  sub: Subscription;
  bObjReady = false;
  educationalAchievementsMarks: any;
  extraCurricularMarks: any;
  afterSchoolMarks: any;
  schoolYearsMarks: any;
  markDetails: FormGroup;

  constructor(private admissionService: AdmissionService,
              private route: ActivatedRoute,
              private router: Router,
              private _formBuilder: FormBuilder,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    // patern validation for no of years
    const marks = '[0-9]{1,2}';
    this.markDetails = this._formBuilder.group({
      schoolYearsMarks: [this.schoolYearsMarks, Validators.pattern(marks)],
      educationalAchievementsMarks: [this.educationalAchievementsMarks, Validators.pattern(marks)],
      extraCurricularMarks: [this.extraCurricularMarks,  Validators.pattern(marks)],
      afterSchoolMarks: [this.afterSchoolMarks, Validators.pattern(marks)]
    });
    // initializes the admission object
    this.admission = new AdmissionApplication();
    // get the route parameters from the URL
    this.sub = this.route.params.subscribe(params => {
      this.admissionId = params['id'];
      this.getAdmission(this.admissionId);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  getCurrentStudentValue() {
    if (this.admission) {
      if (this.admission.currentStudents === 'yes') {
        return 'Yes';
      } else {
        return 'No';
      }
    }
  }

  getServicesOfferedValue() {
    if (this.admission) {
      if (this.admission.servicesOffered === 'yes') {
        return 'Yes';
      } else {
        return 'No';
      }
    }
  }

  getScholarshipValue() {
    if (this.admission) {
      if (this.admission.scholarship === 'yes') {
        return 'Yes';
      } else {
        return 'No';
      }
    }
  }

  getLeadershipValue(leadership: string) {
    if (this.admission) {
      if (leadership === 'hp') {
        return 'Head Prefect';
      } else if (leadership === 'dhp') {
        return 'Deputy Head Prefect';
      } else if (leadership === 'gc') {
        return 'Games Captain';
      } else if (leadership === 'vgc') {
        return 'Vice Games Captain';
      } else if (leadership === 'p') {
        return 'Prefectt';
      } else if (leadership === 'hc') {
        return 'House Captain';
      }
    }
  }

  getExtraCurricularValue(extra: string) {
    if (this.admission) {
      if (extra === 'aesthetic') {
        return 'Aesthetic';
      } else if (extra === 'sports') {
        return 'Sports';
      } else if (extra === 'societies') {
        return 'Societies';
      }
    }
  }

  getLetterTypeValue(type: string) {
    if (this.admission) {
      if (type === 'special') {
        return 'Special Letter';
      } else if (type === 'service') {
        return 'Service Lettter';
      }
    }
  }

  getPositionValue(position: string) {
    if (this.admission) {
      if (position === 'leader') {
        return 'Leader';
      } else if (position === 'captain') {
        return 'Captain';
      } else if (position === 'other') {
        return 'Other';
      }
    }
  }

  getEducationalQualificationValue(edu: string) {
    if (this.admission) {
      if (edu === 'diploma') {
        return 'Diploma';
      } else if (edu === 'degree') {
        return 'Degree';
      } else if (edu === 'masters') {
        return 'Masters';
      } else if (edu === 'phd') {
        return 'PhD';
      } else if (edu === 'professional') {
        return 'Professional Qualification';
      }
    }
  }

  getChampionshipValue(championship: string) {
    if (this.admission) {
      if (championship === 'island') {
        return 'All Island Championship';
      } else if (championship === 'provincial') {
        return 'Provincial Level Championship';
      } else if (championship === 'international') {
        return 'International Level Participation/Championship';
      }
    }
  }

  private getAdmission(id: string) {
    this.admissionService.getAdmission(id).subscribe((data: AdmissionModel) => {
      if (data) {
        this.admission = data;
        if (this.admission.status === 'Pending' && this.admission.schoolYears) {
          // convert the string value to a number
          const years = +this.admission.schoolYears;
          // validate the years in school value and calculate the marks for that field
          if (years > 0 && years < 14) {
            this.schoolYearsMarks = years * 2;
          }
        } else {
          this.markDetails.get('schoolYearsMarks').setValue(this.admission.schoolYearsMarks);
          this.markDetails.get('educationalAchievementsMarks').setValue(this.admission.educationalAchievementsMarks);
          this.markDetails.get('extraCurricularMarks').setValue(this.admission.extraCurricularMarks);
          this.markDetails.get('afterSchoolMarks').setValue(this.admission.afterSchoolMarks);
        }
      }
    });
  }

  reject() {
    this.admission.status = 'Rejected';
    this.admissionService.updateAdmission(this.admission);
    this.openSnackBar('Application Rejected!');
    this.cancel();
  }

  accept() {
    if (this.markDetails.valid) {
      // validate the form details
      if ((this.schoolYearsMarks && this.schoolYearsMarks !== '') ||
          (this.educationalAchievementsMarks && this.educationalAchievementsMarks !== '') ||
          (this.extraCurricularMarks && this.extraCurricularMarks !== '') ||
          (this.afterSchoolMarks && this.afterSchoolMarks !== '')) {
            // validate the marks fields
        if (this.schoolYearsMarks < 27 && this.educationalAchievementsMarks < 26 && this.extraCurricularMarks < 26 &&
          this.afterSchoolMarks < 26) {
            this.admission.schoolYearsMarks = this.schoolYearsMarks;
            this.admission.educationalAchievementsMarks = this.educationalAchievementsMarks;
            this.admission.extraCurricularMarks = this.extraCurricularMarks;
            this.admission.afterSchoolMarks = this.afterSchoolMarks;
            this.admission.status = 'Reviewed';
            this.admissionService.updateAdmission(this.admission);
            this.openSnackBar('Successfully Updated the Application!');
            this.cancel();
          } else {
            alert('form valid - Invalid Marks Detected!');
          }
      }
    } else {
      alert('Invalid Marks Detected!');
    }
  }

  save() {
    if (this.markDetails.valid) {
      // validate the form details
      if ((this.schoolYearsMarks && this.schoolYearsMarks !== '') ||
          (this.educationalAchievementsMarks && this.educationalAchievementsMarks !== '') ||
          (this.extraCurricularMarks && this.extraCurricularMarks !== '') ||
          (this.afterSchoolMarks && this.afterSchoolMarks !== '')) {
            // validate the marks fields
        if (this.schoolYearsMarks < 27 && this.educationalAchievementsMarks < 26 && this.extraCurricularMarks < 26 &&
          this.afterSchoolMarks < 26) {
            this.admission.schoolYearsMarks = this.schoolYearsMarks;
            this.admission.educationalAchievementsMarks = this.educationalAchievementsMarks;
            this.admission.extraCurricularMarks = this.extraCurricularMarks;
            this.admission.afterSchoolMarks = this.afterSchoolMarks;
            this.admission.status = 'Reviewed';
            this.admissionService.updateAdmission(this.admission);
            this.openSnackBar('Successfully Updated the Reviewed Application!');
            this.cancel();
          } else {
            alert('form valid - Invalid Marks Detected!');
          }
      }
    } else {
      alert('Invalid Marks Detected!');
    }
  }

  cancel() {
    this.router.navigate(['/review-admission']);
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

