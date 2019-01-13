import { ImagePost } from './image-post.model';
import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ImagePostService {
  private images: ImagePost[] = [];
  private listUpdated = new Subject<{imageData: ImagePost[], imgCount: number}>();

  constructor(private http: HttpClient) {}

  getImages(imagesPerPage: number, currPage: number) {
    // return [...this.images];
    const queryParams = `?pagesize=${imagesPerPage}&currpage=${currPage}`;
    this.http
      .get<{ message: string; images: any, imgCount: number }>(
        '/api/gallery' + queryParams
      )
      .pipe(map((imgData) => {
        return { imageData: imgData.images.map(post => {
          return {
            title: post.title,
            desc: post.desc,
            id: post._id,
            imagePath: post.imagePath
          };
        }), imgCount: imgData.imgCount};
      }))
      .subscribe(transformedImageData => {
        this.images = transformedImageData.imageData;
        this.listUpdated.next({imageData: [...this.images], imgCount: transformedImageData.imgCount});
      });
  }

  deletePost(imgId: string) {
    return this.http.delete('/api/gallery/' + imgId);
  }

  addImage(title: string, desc: string, image: File) {
    const imagePostData = new FormData();
    imagePostData.append('title', title);
    imagePostData.append('desc', desc);
    imagePostData.append('image', image, title);
    return this.http
      .post<{ message: string, imgObj: any }>('/api/gallery', imagePostData);
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }
}
