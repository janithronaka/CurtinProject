import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AdmissionModel } from '../admission.model';
import { AdmissionService } from '../admission.service';

@Component({
  selector: 'app-admission-menu',
  templateUrl: './admission-menu.component.html',
  styleUrls: ['./admission-menu.component.css']
})

export class AdmissionMenuComponent implements OnInit {
  admissions: AdmissionModel[] = [];
  memberId: string;
  sessionMember = '';
  schoolYears: number;
  educational: number;
  extraCurricular: number;
  afterSchool: number;

  constructor(
    private router: Router,
    private admissionService: AdmissionService) { }

  ngOnInit() {
    // get the logged member's memberId from session storage
    this.sessionMember = sessionStorage.getItem('id');
    this.getAllAdmissions();
  }

  onAddClick() {
    this.router.navigate(['/new-admissions', 'new']);
  }

  private getAllAdmissions() {
    // get all admission objects from the database
    this.admissionService.getAllAdmissions().subscribe((data: AdmissionModel[]) => {
      if (data) {
        this.admissions = data;
      }
    });
  }

  onAdmissionEdit(id: any) {
    // navigate to the clicked admission's editable page
    this.router.navigate(['/new-admissions', id]);
  }

  ondelete(id: string) {
    let i = 0;
    // deletes the relevant admission from the database
    this.admissionService.deleteAdmission(id);
    // find the relevant admission item from the array and remove the array entry
    this.admissions.forEach(admission => {
      if (admission._id === id) {
        this.admissions.splice(i);
      }
      i++;
    });
  }

  // calculate the total marks of reviewed admissions
  getTotalMarks(admission: AdmissionModel) {
    this.schoolYears = +admission.schoolYearsMarks;
    this.educational = +admission.educationalAchievementsMarks;
    this.extraCurricular = +admission.extraCurricularMarks;
    this.afterSchool = +admission.afterSchoolMarks;
    const totalMarks = this.schoolYears + this.educational + this.extraCurricular + this.afterSchool;
    return totalMarks;

  }
}
