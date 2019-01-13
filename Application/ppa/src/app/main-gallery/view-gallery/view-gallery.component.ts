import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImagePost } from '../image-post.model';
import { ImagePostService } from '../image-post.service';
import { Subscription } from 'rxjs';
import { PageEvent, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-view-gallery',
  templateUrl: './view-gallery.component.html',
  styleUrls: ['./view-gallery.component.css']
})
export class ViewGalleryComponent implements OnInit, OnDestroy {
  totalImages = 0;
  imagesPerPage = 8;
  currPage = 0;
  loading = false;
  pageSizeOption = [8, 12, 16, 20];
  images: ImagePost[] = [];
  public imagePostService: ImagePostService;
  private imageSubs: Subscription;

  constructor(imagePostService: ImagePostService, public snackBar: MatSnackBar) {
    this.imagePostService = imagePostService;
  }

  ngOnInit(): void {
    this.loading = true;
    this.imagePostService.getImages(this.imagesPerPage, 1);
    this.imageSubs = this.imagePostService.getListUpdateListener()
      .subscribe((imageData: {imageData: ImagePost[], imgCount: number}) => {
      this.loading = false;
      this.images = imageData.imageData;
      this.totalImages = imageData.imgCount;
    });
  }

  onDelete(imgId: string) {
    this.loading = true;
    this.imagePostService.deletePost(imgId).subscribe((deleteData: any) => {
      this.openSnackBar(deleteData.message, null);
      this.imagePostService.getImages(this.imagesPerPage, this.currPage);
    }, err => {
      if (err.error.message) {
        this.openSnackBar(err.error.message, null);
      } else {
        this.openSnackBar(err.message, null);
      }
    });
  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  onPageChanged(pageData: PageEvent) {
    this.loading = true;
    this.currPage = pageData.pageIndex + 1;
    this.imagesPerPage = pageData.pageSize;
    this.imagePostService.getImages(this.imagesPerPage, this.currPage);
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action ? 'Action Label' : 'Hide', {
      duration: 3000,
    });
  }
}
