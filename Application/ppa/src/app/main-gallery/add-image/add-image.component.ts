import { Component, OnInit } from '@angular/core';
import { ImagePost } from '../image-post.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ImagePostService } from '../image-post.service';
import { imageValidator } from './image-validator';
import { MatSnackBar } from '@angular/material';
import { ExcoService } from 'src/app/exco-members/exco.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  imageObj = 'no image';
  enterdDesc = '';
  public imagePostService: ImagePostService;
  form: FormGroup;
  imagePreview: any;
  isSave = false;
  isAdmin = false;
  sessionID: any;
  formTitle = 'Gallery';

  constructor(imagePostService: ImagePostService, public snackBar: MatSnackBar, private excoService: ExcoService) {
    this.imagePostService = imagePostService;
  }

  onAddImage(formDirective: FormGroupDirective) {
    // console.dir(desc);
    // this.imageObj = this.enterdDesc;
    if (this.form.invalid) {
      return;
    }
    this.isSave = true;
    this.imagePostService.addImage(this.form.value.title, this.form.value.desc, this.form.value.image).subscribe((imageData: any) => {
      // this.imagePostService.getImages(this.pageData.imagesPerPage + 1, this.pageData.currPage);
      this.openSnackBar(imageData.message, null);
      this.isSave = false;
      this.imagePostService.getImages(8, 1);
    });
    formDirective.resetForm();
    this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action ? 'Action Label' : 'Hide', {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.sessionID = sessionStorage.getItem('id');

    if (this.sessionID == null) {
      return;
    }
    this.excoService.getByMemId(this.sessionID).subscribe((data: any) => {
      if (data.position === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
        return;
      }
     });

    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      desc: new FormControl(null, { validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [imageValidator]})
    });
  }
}
