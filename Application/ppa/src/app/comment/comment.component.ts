import { Component, OnInit, Inject, Input } from '@angular/core';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';
import { MembershipService } from '../new-membership/membership/membership.service';
import { Membership } from '../new-membership/membership/membership.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog, MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  detailedComments = [] as DetailedComment[];
  bCollapse = true;
  linkName = 'Show';
  loggedUser = '';
  // tslint:disable-next-line:no-input-rename
  @Input ('project') project: string;
  // tslint:disable-next-line:no-input-rename
  @Input ('subProject') subProject: string;

  constructor(private commentService: CommentService,
              private dialog: MatDialog,
              private membershipService: MembershipService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loggedUser = sessionStorage.getItem('id');
    console.log(this.project);
    this.getAllComments();
  }

  getAllComments() {
    this.commentService.getAllComments().subscribe((data: Comment[]) => { // Call to the service file get method
      if (data) {
        let allComments = [] as Comment[];
        this.detailedComments = [] as DetailedComment[];
        allComments = data; // set the loaded comments to te array
        let index = 0;
        allComments.forEach(comment => {  // loop each commment in allComments array
          if (comment.projectId === this.project) {
            const deatailedCmnt = {
              _id: comment._id,
              title: comment.title,
              comment: comment.comment,
              memberId: comment.memberId,
              adminOnly: comment.adminOnly,
              category: comment.category,
              projectId: comment.projectId,
              subProjectId: comment.subProjectId,
              preferredName: '',
              nameLetters: '',
              read: comment.read
            };
            this.detailedComments.push(deatailedCmnt);  // add the detailed comment object to the array
            // set member preferred name and initials of the prefered name to each added comment object
            this.setMemberNameDetails(comment.memberId, index++);
          }
        });
      }
    });
  }

  commentMore() {
    this.bCollapse = !this.bCollapse;
    this.linkName = (this.linkName === 'Show') ? 'Hide' : 'Show';
  }

  // shows a snack bar message to the user
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000, // time duration the snackbar will be displayed
    });
  }

  onAddNew() {
    // create an empty comment object
    const commentObj = new DetailedComment();
    commentObj.adminOnly = '0';
    commentObj.projectId = this.project;
    commentObj.subProjectId = this.subProject;
    commentObj.category = 'project';
    commentObj.memberId = this.loggedUser;
    commentObj.read = '0';
    // open the add new comment dialog
    const dialogRef = this.dialog.open(NewCommentDialog, {width: '500px', data: {operation: 'new', dataObj: commentObj}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // if the Add button is clicked and a value set for the result variable
        this.membershipService.getMembershipByMemberId(result.memberId).subscribe((data: Membership) => {
          result.preferredName = data.preferredName;  // update the member name for the new item
          result.nameLetters = this.getNameLetters(data.preferredName); // update the member name letters for the new item
          this.detailedComments.push(result); // add the new item to the array
        });
      }
    });
  }

  onEditComment(commentObj: DetailedComment) {
    // open the edit comment dialog
    const dialogRef = this.dialog.open(NewCommentDialog, {width: '500px', data: {operation: 'edit', dataObj: commentObj}});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // if the Save button is clicked and a value is set for the result varaible, execute the updateCommentObj method
        this.updateCommentObj(result);
      }
    });
  }

  onDeleteComment(id: string) {
    if (confirm('Are you sure to delete this comment?')) {
      this.commentService.deleteComment(id);
      this.removeCommentObj(id);
      this.openSnackBar('Suggestion/Complain Successfully Removed!'); // confirmation message
    }
  }

  private setMemberNameDetails(memberId: string, index: number) {
    this.membershipService.getMembershipByMemberId(memberId).subscribe((data: Membership) => {
      this.detailedComments[index].preferredName = data.preferredName;
      this.detailedComments[index].nameLetters = this.getNameLetters(data.preferredName);
    });
  }

  private updateCommentObj(editedObj: DetailedComment) {
    const arrIndex = this.getCommentArrayIndex(editedObj._id);
    if (arrIndex !== -1) {
      this.detailedComments[arrIndex].title = editedObj.title;
      this.detailedComments[arrIndex].comment = editedObj.comment;
      this.detailedComments[arrIndex].adminOnly = editedObj.adminOnly;
    }
  }

  private removeCommentObj(id: string) {
    const arrIndex = this.getCommentArrayIndex(id);
    if (arrIndex !== -1) {
      this.detailedComments.splice(arrIndex, 1);
    }
  }

  private getCommentArrayIndex(id: string) {
    let index = -1;
    let count = 0;
    this.detailedComments.forEach(cmnt => {
      if (index === -1) {
        if (cmnt._id === id) {
          index = count;
        }
        count++;
      }
    });
    return index;
  }

  // this method return the first letter(s) of preferred name(s)
  private getNameLetters(name: string): any {
    const names = name.split(' '); // split the preferred name by space to get all the preferred names
    let letters = '';
    names.forEach(data => {
      letters += data.substring(0, 1);  // get each name's first letter
    });
    return letters; // return the first letters of the preferred name
  }

}

// this class contains more descriptive comment object with fields member name
class DetailedComment {
  _id: string;
  title: string;
  comment: string;
  memberId: string;
  adminOnly: string;
  category: string;
  projectId: string;
  subProjectId: string;
  preferredName: string;
  nameLetters: string;
  read: string;

  constructor() {}
}

@Component({
  selector: 'app-new-comment-dialog',
  templateUrl: 'new-comment.html',
})
// tslint:disable-next-line:component-class-suffix
export class NewCommentDialog implements OnInit {
  operation: any;
  bSave = false;
  bAdd = false;
  slideValue = false;
  title = '';
  comment = '';

  constructor(
    public dialogRef: MatDialogRef<NewCommentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commentService: CommentService,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    if (this.data.operation === 'new') {
      this.bAdd = true;
      this.bSave = false;
    } else {
      if (this.data.dataObj) {
        this.title = this.data.dataObj.title;
        this.comment = this.data.dataObj.comment;
        this.slideValue = (this.data.dataObj.adminOnly === '1') ? true : false;
      }
      this.bAdd = false;
      this.bSave = true;
    }
  }

  // Edit comment
  onSave(): void {
    if ((this.title !== '' && this.title != null) && (this.comment !== '' && this.comment != null)) {
    const adminOnlyValue = (this.slideValue) ? '1' : '0';
    const comnt = {
      _id: this.data.dataObj._id,
      adminOnly: adminOnlyValue,
      title: this.title,
      comment: this.comment,
      memberId: this.data.dataObj.memberId,
      projectId: this.data.dataObj.projectId,
      subProjectId: this.data.dataObj.subProjectId,
      category: this.data.dataObj.category,
      read: this.data.dataObj.read
    };
    this.data.dataObj.title = this.title;
    this.data.dataObj.comment = this.comment;
    this.data.dataObj.adminOnly = adminOnlyValue;
    this.commentService.updateComment(comnt);
    this.openSnackBar('Suggestion/Complain Successfully Updated!'); // confirmation message
    this.dialogRef.close(this.data.dataObj);
    } else {
      alert ('Title or Comment fields cannot be empty!');
    }
  }

  // shows a snack bar message to the user
  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000, // time duration the snackbar will be displayed
    });
  }

  // Add new comment
  onAdd(): void {
    if ((this.title !== '' && this.title != null) && (this.comment !== '' && this.comment != null)) {
      const adminOnlyValue = (this.slideValue) ? '1' : '0';
      const comnt = {
        _id: null,
        adminOnly: adminOnlyValue,
        title: this.title,
        comment: this.comment,
        memberId: this.data.dataObj.memberId,
        projectId: this.data.dataObj.projectId,
        subProjectId: this.data.dataObj.subProjectId,
        category: this.data.dataObj.category,
        read: '0'
      };
      this.data.dataObj.title = this.title;
      this.data.dataObj.comment = this.comment;
      this.data.dataObj.adminOnly = (this.slideValue) ? '1' : '0';
      this.data.dataObj.read = comnt.read;
      this.commentService.addComment(comnt);
      this.openSnackBar('Suggestion/Complain Successfully Added!'); // confirm the reject action to the end user
      this.dialogRef.close(this.data.dataObj);
    } else {
      alert ('Title or Comment fields cannot be empty!');
    }
  }
}
