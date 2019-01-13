import { Component, OnInit } from '@angular/core';
import { MembershipService } from '../new-membership/membership/membership.service';
import { RequestService } from '../letter-request/request.service';
import { Router } from '@angular/router';
import { ProjectService } from '../project/project.service';
import { ProjectModel } from '../project/project.model';
import { CommentService } from '../comment/comment.service';
import { ExcoService } from '../exco-members/exco.service';
import { ExcoModel } from '../exco-members/exco.model';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css']
})
export class SummaryViewComponent implements OnInit {

  pendingMembershipsCount = 0;
  pendingLettersCount = 0;
  newdDonations = 0;
  newSuggestionsComplaints = 0;
  upcomingProjectName = 'Not Available';
  totalMemberCount = 0;
  exCoMemberCount = 0;
  nextProjectAvailable = false;
  nextProject: ProjectModel;

  constructor(private membershipService: MembershipService,
              private requestService: RequestService,
              private router: Router,
              private projectService: ProjectService,
              private commentService: CommentService,
              private excoService: ExcoService) { }

  ngOnInit() {
    this.getPendingMembershipsCount();
    this.getPendingLettersCount();
    this.getnewDonationsAmount();
    this.getnewSuggestionsComplaintsCount();
    this.getUpcomingProjectName();
    this.getTotalMemberCount();
    this.getExCoMemberCount();
  }

  navigateToLetterRequests() {
    this.router.navigate(['/review-letters']);
  }

  navigateToMembershipRequests() {
    this.router.navigate(['/review-memberships']);
  }

  navigateToAllProjects() {
    this.router.navigate(['/projects']);
  }

  navigateToProject() {
    if (this.nextProjectAvailable) {
      this.router.navigate(['/projects/', this.nextProject.projectId]);
    }
  }

  navigateToComments() {
    if (this.nextProjectAvailable) {
      this.router.navigate(['/view-comments']);
    }
  }

  getPendingMembershipsCount() {
    this.membershipService.getNewMembershipCount().subscribe((data: number) => {
      if (data) {
        this.pendingMembershipsCount = data;
      }
    });
  }

  getPendingLettersCount() {
    this.requestService.getPendingRqstCount().subscribe((data: number) => {
      if (data) {
        this.pendingLettersCount = data;
      }
    });
  }

  getnewSuggestionsComplaintsCount() {
    this.commentService.geNewCommentsCount().subscribe((data: number) => {
      if (data) {
        this.newSuggestionsComplaints = data;
      }
    });
  }

  getUpcomingProjectName() {
    this.projectService.getNextProject().subscribe((data: ProjectModel) => {
      if (data) {
        this.nextProject = data;
        this.upcomingProjectName = data.name;
        this.nextProjectAvailable = true;
      }
    });
  }

  getnewDonationsAmount() {
    this.newdDonations = 24000;
  }

  getTotalMemberCount() {
    this.membershipService.getAllProfileCount().subscribe((data: number) => {
      if (data) {
        this.totalMemberCount = data;
      }
    });
  }

  getExCoMemberCount() {
    this.excoService.getAllExco().subscribe((data: ExcoModel[]) => {
      if (data) {
        const today = new Date();
        let count = 0;
        data.forEach(excoMem => {
          const from = new Date(excoMem.date_from);
          const to = new Date(excoMem.date_to);
          if ( from < today && to > today) {
            count++;
          }
        });
        this.exCoMemberCount = count;
      }
    });
  }
}
