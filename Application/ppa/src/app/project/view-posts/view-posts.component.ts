import { Component, OnInit } from '@angular/core';
import { PostModel, AttachmentModel } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  posts: PostModel[] = [];
  projectId: string;
  newPost: PostModel;
  attachments: AttachmentModel[];
  selectedFiles: File[];
  userFullName: string;
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userFullName = sessionStorage.getItem('name');
    this.clearNewPost();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.projectId = paramMap.get('projectId');
        this.postService.getPosts(this.projectId).subscribe((data) => {
          this.posts = data;
        })
      }
    });
  }

  createPost(form: NgForm) {
    form.value.projectId = this.projectId;
    this.postService.createPost(form.value).subscribe((data: any) => {
      if (this.selectedFiles) {
        var newFormData = new FormData();
        newFormData.append("projectId", this.projectId);
        newFormData.append("postId", data.postId);
        for (var i in this.selectedFiles) {
          newFormData.append("uploadFile[" + i + "]", this.selectedFiles[i]);
        }
        console.log(data);
        console.log(newFormData);
        this.postService.uploadPostAttachments(this.projectId, data.postId, newFormData).subscribe((uploadData) => {
          this.clearNewPost();
          this.postService.getPosts(this.projectId).subscribe((newPosts) => {
            this.populateFeed(newPosts);
          });
        })
      }
      else {
        this.clearNewPost();
        this.postService.getPosts(this.projectId).subscribe((newPosts) => {
          this.populateFeed(newPosts);
        });
      }
    });
  }

  deletePost(post: any) {
    this.postService.deletePost(post).subscribe((data) => {
      this.postService.getPosts(this.projectId).subscribe((newPosts) => {
        this.populateFeed(newPosts);
      });
    })
  }

  populateFeed(posts: any) {
    console.log(posts);
    this.posts = [];
    posts.forEach(post => {
      this.posts.push(post);
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {

      this.attachments = [];
      this.selectedFiles = [];
      for (var i = 0; i < fileList.length; i++) {
        var file: File = fileList[i];
        // var attachment: AttachmentModel = {
        //   fileName: file.name,
        //   fileType: file.type,
        //   location: `${this.projectId}/`
        // }
        //this.attachments.push(attachment);
        this.selectedFiles.push(file);
      }
      let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    }
  }

  clearNewPost() {
    this.newPost = {
      attachments: [],
      createdDate: null,
      description: '',
      postId: null,
      projectId: '',
      user: 'Tharushan'
    }
  }

}
