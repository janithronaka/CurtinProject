import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../comment.model';

@Pipe({
  name: 'commentfilter'
})
export class CommentFilterPipe implements PipeTransform {

  transform(comments: DetailedComment[], searchText: string, sortMode: string): any[] {
    // if the array is empty the pipe returns an empty array
    if (!comments) {
      return [];
    }
    if (!searchText) {
      return comments.filter( cmnt => {
         return this.validateCommentState(cmnt.read, sortMode);
      });
    }
    searchText = searchText.toLowerCase();
    return comments.filter( cmnt => {
          return (this.findInMemberInfo(cmnt.memberId, cmnt.memberName, searchText) ||
                  this.findInProjectInfo(cmnt.projectId, cmnt.projectName, searchText) ||
                  this.findInComment(cmnt.comment, searchText) &&
                    this.validateCommentState(cmnt.read, sortMode));
        });
    }

    // filter by comment status
    validateCommentState(type: string, sortMode: string) {
      if (sortMode === 'all') {
        return true;
      } else if (sortMode === 'new') {
        return (type === '0');
      }
    }

    findInComment(comment: string, search: string) {
      if (comment.toLowerCase().includes(search)) {
        return true;
      } else {
        return false;
      }
    }

    // filter by member's name or id
    findInMemberInfo(id: string, name: string, search: string) {
      const names = name.split(' ');
      let found = false;
      if (search.toLowerCase() === id) {
        return true;
      } else {
        for (let index = 0; index < names.length; index++) {
          if (!found) {
            if (names[index].toLowerCase().includes(search.toLowerCase())) {
              found = true;
            }
          }
        }
        return found;
      }
    }

    // filter by project name or id
    findInProjectInfo(id: string, name: string, search: string) {
      let names: any;
     if (name) {
      names = name.split(' ');
     }
      let found = false;
      if (search.toLowerCase() === id) {
        return true;
      } else if (names) {
        for (let index = 0; index < names.length; index++) {
          if (!found) {
            if (names[index].toLowerCase().includes(search.toLowerCase())) {
              found = true;
            }
          }
        }
        return found;
      }
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

  costructor() {}
}
