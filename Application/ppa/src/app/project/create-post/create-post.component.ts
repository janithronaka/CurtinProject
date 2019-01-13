import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  projectId: string;
  newPost: PostModel;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.newPost = {
      attachments: [],
      createdDate: null,
      description: 'Test',
      postId: null,
      projectId: '',
      user: 'Tharushan'
    }
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.newPost.projectId = paramMap.get('projectId');
      }
    });
  }

  createPost(form: NgForm) {
    console.log(form.value)
    form.value.projectId = this.newPost.projectId;
    this.postService.createPost(form.value).subscribe((data: any) => {
      
      console.log(data);
    });
  }

}
