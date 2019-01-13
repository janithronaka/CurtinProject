import { Component, OnInit, OnDestroy } from '@angular/core';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';
import { ProjectService } from '../../project/project.service';
import { MembershipService } from '../../new-membership/membership/membership.service';
import { Membership } from '../../new-membership/membership/membership.model';
import { ProjectModel } from '../../project/project.model';

@Component({
  selector: 'app-review-comments',
  templateUrl: './review-comments.component.html',
  styleUrls: ['./review-comments.component.css']
})
export class ReviewCommentsComponent implements OnInit, OnDestroy {
  startDate: any;
  endDate: any;
  searchText = '';
  selectedType = 'all';
  comments: DetailedComment[] = [];

  constructor(private commentService: CommentService,
              private memberService: MembershipService,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.getAllComments();
  }

  ngOnDestroy(): void {
    // set all comments status as read when unloading the page
    this.comments.forEach(cmnt => {
      if (cmnt.read === '0') {
        cmnt.read = '1';
        this.commentService.updateComment(cmnt);
      }
    });
  }

  // get all comments
  getAllComments() {
    this.commentService.getAllComments().subscribe((cmnts: DetailedComment[]) => {
      if (cmnts) {
        this.comments = cmnts;
        let index = 0;
        cmnts.forEach(comment => {
          this.setMemberName(comment.memberId, index);
          this.setProjectName(comment.projectId, index);
          this.setCommentAsRead(comment._id, index);
          index++;
        });
      }
    });
  }

  setMemberName(memberId: string, index: number) {
    this.memberService.getMembershipByMemberId(memberId).subscribe((member: Membership) => {
      if (member) {
        this.comments[index].memberName = member.memberName;
        this.comments[index].preferredName = member.preferredName;
      }
    });
  }

  setProjectName(projectId: string, index: number) {
    this.projectService.getProject(projectId).subscribe((project: ProjectModel) => {
      if (project) {
        this.comments[index].projectName = project.name;
      }
    });
  }

  setCommentAsRead(id: string, index: number) {
    const mirrorComment = this.comments[index] as DetailedComment;
    // mirrorComment.read = '1';
    // this.commentService.updateComment(mirrorComment);
  }

}

class DetailedComment implements Comment {
  _id: string;
  title: string;
  comment: string;
  memberId: string;
  memberName: string;
  projectName: string;
  adminOnly: string;
  category: string;
  projectId: string;
  subProjectId: string;
  preferredName: string;
  nameLetters: string;
  read: string;

  constructor() {}
}
