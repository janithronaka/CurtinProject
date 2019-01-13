import { Component, OnInit } from '@angular/core';
import { AdmissionModel } from '../admission.model';
import { AdmissionService } from '../admission.service';

@Component({
  selector: 'app-review-admission',
  templateUrl: './review-admission.component.html',
  styleUrls: ['./review-admission.component.css']
})
export class ReviewAdmissionComponent implements OnInit {
  admissions: AdmissionModel[] = [];
  searchText = '';
  selected = 'all';
  constructor(private admissionService: AdmissionService) { }

  ngOnInit() {
    this.getAllAdmissions();
  }

  // get all admission from the db
  private getAllAdmissions() {
    this.admissionService.getAllAdmissions().subscribe((data: AdmissionModel[]) => {
      if (data) {
        this.admissions = data;
      }
    });
  }

  onClickDetailedView(admission: AdmissionModel) {

  }
}
