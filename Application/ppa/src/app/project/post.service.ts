import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {

  }

  getPosts(projectId) {
    return this.http.get<PostModel[]>(`/api/posts/${projectId}/all`);
  }
  getPost(postId) {
    return this.http.get<PostModel>(`/api/posts/${postId}`);
  }

  createPost(postObj) {
    return this.http.post<PostModel>(`/api/posts`, postObj);
  }
  uploadPostAttachments(projectId, postId, postObj) {
    return this.http.post<PostModel>(`/api/posts/${projectId}/${postId}/upload`, postObj);
  }
  updatePost(postObj) {
    return this.http.put<PostModel>(`/api/posts/${postObj.postId}`, postObj);
  }
  deletePost(postObj) {
    return this.http.delete<PostModel>(`/api/posts/${postObj.postId}`, postObj);
  }
}
