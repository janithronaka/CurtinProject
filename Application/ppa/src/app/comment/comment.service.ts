import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CommentService {

  constructor (private http: HttpClient) {}

  // get all comments method
  getAllComments() {
    return this.http.get('/api/comment/all');
  }

  // get all comments method
  geNewCommentsCount() {
    return this.http.get('/api/comment/new-count');
  }

  // insert comment method
  addComment(newObj: any) {
    console.log('---INSERT--');
    console.log(newObj);
    this.http.post<{ status: any, message: any }>('/api/comment', newObj).subscribe();
  }

  // update comment method
  updateComment(commentObj: any) {
    console.log('---UPDATE--');
    console.log(commentObj);
    this.http.put<{ status: any, message: any }>('/api/comment/', commentObj).subscribe();
  }

  // delete comment method
  deleteComment(commentId: any) {
    console.log('---DELETE--');
    console.log(commentId);
    this.http.delete('/api/comment/' + commentId).subscribe();
  }
}
