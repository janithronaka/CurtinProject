import { Component, AfterViewInit, Input, ElementRef, Inject, ViewChild, OnChanges  } from '@angular/core';

@Component({
  selector: 'app-read-more-util',
  templateUrl: './read-more-util.component.html',
  styleUrls: ['./read-more-util.component.css']
})
export class ReadMoreUtilComponent implements OnChanges  {

  // the texts that need to be put in the container
  @Input() title: string;
  @Input() comment: string;

  // maximum height of the container
  @Input() maxLength: number;

  currentText = '';

  // set these to false to get the height of the expended container
  public isCollapsed = false;
  public isCollapsable = false;

  constructor(private elementRef: ElementRef) {
  }

  // change the conditional variable which used to check the visibility of the long comments
  toggleView() {
    this.isCollapsed = !this.isCollapsed; // invert the value of isCollapsed
    if (this.isCollapsable) { // if the comment is a long comment calls to showHideComment()
      this.showHideComment();
    }
}

// identify the comment length and set the variables
determineView() {
    if (this.comment.length <= this.maxLength) {  // compare the comment length
        this.currentText = this.comment;  // if the comment length is less than the maxLength show the full comment
        this.isCollapsed = false;
        return;
    } else {
      this.isCollapsable = true;
      this.isCollapsed = true;
      this.showHideComment(); // if the comment length is greater than the maxLength calls to this method to show only a part of the comment
    }
}

showHideComment() {
  if (this.isCollapsed === true) {
    this.currentText = this.comment.substring(0, this.maxLength) + '...'; // shorten the comment
  } else if (this.isCollapsed === false)  {
      this.currentText = this.comment;  // show full comment
  }
}

ngOnChanges() {
    this.determineView();
}

}
