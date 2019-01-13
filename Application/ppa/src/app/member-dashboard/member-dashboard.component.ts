import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../letter-request/request.service';
import { IfStmt } from '@angular/compiler';
import { ProjectService } from '../project/project.service';
import { ExcoService } from '../exco-members/exco.service';
import { ExcoModel } from '../exco-members/exco.model';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {

  pendingCount = 0;
  acceptedCount = 0;
  rejectedCount = 0;
  memberID: any;
  length: any;
  totalCount = 0;
  upcomingProject = 0;
  ongoingProject = 0;
  completedProject = 0;
  cancelProject = 0;
  totalProjects = 0;
  yearPresident = [] as any;
  yearsecretary = [] as any;
  yearaccountent = [] as any;
  yearadmin = [] as any;
  private exco: ExcoModel[] = [];
  thisYear: string;
  crrYear = Date();

  constructor(
    private router: Router,
    private requestService: RequestService,
    private projectService: ProjectService,
    private excoService: ExcoService
  ) { }

  ngOnInit() {
    this.memberID = sessionStorage.getItem('id');
    this.getrequest();
    this.getProject();
    this.getMember();

  }

  letterRequets() {
    this.router.navigate(['/letter-request']);
  }

  gotoMember() {
    this.router.navigate(['/user-profile']);
  }

  gotoExco() {
    this.router.navigate(['/exco-members']);
  }


  getMember() {
    this.excoService.getAllExco().subscribe((data: any) => {
      console.log(data);
      this.exco = data;

      this.yearsecretary = [];
        this.yearaccountent = [];
        this.yearadmin = [];
        this.yearPresident = [];

      for (let i = 0; i < data.length; i++) {
        this.thisYear = (data[i].date_from);



        if (this.thisYear.substr(0, 4) == this.crrYear.substr(11, 4)) {
          if (data[i].position == 'President') {
            this.yearPresident.push(data[i].memberName + ',  ');
          }

          if (data[i].position == 'Accountent') {
            this.yearaccountent.push(data[i].memberName + ',  ');
          }

          if (data[i].position == 'Secretary') {
            this.yearsecretary.push(data[i].memberName + ',  ');
          }

          if (data[i].position == 'Admin') {
            this.yearadmin.push(data[i].memberName + ',  ');
          }
        }
      }


    });
     // this.members = data;

  }



  getrequest() {
    this.requestService.getAllRequest().subscribe((data: any) => {
    this.length = data.length;
    for (let i = 0; i < this.length; i++) {
      if (data[i].memberID == this.memberID) {
        if (data[i].progress == 'Accepted') {
          this.acceptedCount = this.acceptedCount + 1;
        } else if (data[i].progress == 'Rejected') {
          this.rejectedCount = this.rejectedCount + 1;
        } else if (data[i].progress == 'Pending') {
          this.pendingCount = this.pendingCount + 1;
        }
      }

      this.totalCount = this.acceptedCount + this.rejectedCount + this.pendingCount;
    }
    });
  }

  getProject() {
    this.projectService.getProjects().subscribe((data: any) => {
      console.log(data);
    for (let x = 0; x < data.length; x++) {
      if (data[x].status == 'Approved') {
        this.upcomingProject = this.upcomingProject + 1;
      } else if (data[x].status == 'Started') {
        this.ongoingProject = this.ongoingProject + 1;
      } else if (data[x].status == 'Completed') {
        this.completedProject = this.completedProject + 1;
      } else if (data[x].status == 'Cancelled') {
        this.cancelProject = this.cancelProject + 1;
      }

      this.totalProjects = this.upcomingProject + this.ongoingProject + this.completedProject + this.cancelProject;
    }
    });
  }


}
