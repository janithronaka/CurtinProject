import { Component, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { NewsService } from './news.service';
import { News } from './news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {
  newsList = [] as News[];
  minDate: any =  new Date();
  expireDate: any = '';
  submitBtnName: any = 'Add';
  pageTitle: any = 'Add a News';
  Title: any;
  Link: any;
  Description: any;
  NewsForm: any;
  newsId: any;
  disableDelete: any = true;

  constructor(public newsService: NewsService) { }

  ngOnInit() {
    this.expireDate = null;
    this.newsService.deleteExpiredNews();
    this.getNews();
  }

  getNews() {
    this.newsService.getAllNews().subscribe(( data: any) => {
      if ( data ) {
        this.newsList = data;
      } else {
        // error handling
      }
    });
  }

  onAddNews(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.submitBtnName === 'Add') {
      this.newsService.addNews(this.Title, this.Description, this.expireDate, this.Link);
    } else {
      this.newsService.saveNews(this.newsId, this.Title, this.Description, this.expireDate,  this.Link);
    }
    this.submitBtnName = 'Add';
    this.expireDate = null;
    this.pageTitle = 'Add a News';
    this.disableDelete = true;
    form.reset();
    this.getNews();
  }

  onEditNews(newsObj: News) {
    this.submitBtnName = 'Save';
    this.Title = newsObj.title;
    this.Description = newsObj.description;
    this.newsId = newsObj._id;
    this.expireDate = newsObj.exDate;
    this.disableDelete = false;
    this.pageTitle = 'Edit ' + newsObj.title;
    this.Link = newsObj.link;
  }

  onCancel(form: NgForm) {
    this.submitBtnName = 'Add';
    this.expireDate = null;
    this.pageTitle = 'Add a News';
    this.disableDelete = true;
    this.newsId = null;
    form.reset();
  }

  onDelete() {
    this.newsService.deleteNews(this.newsId);
    this.newsList = [] as News[];
    this.getNews();
  }

}
