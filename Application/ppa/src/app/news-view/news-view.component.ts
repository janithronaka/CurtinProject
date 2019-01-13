import { Component, OnInit } from '@angular/core';
import { NewsService } from '../admin-news/news.service';
import { News } from '../admin-news/news.model';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.css']
})
export class NewsViewComponent implements OnInit {
  newsList = [] as News[];   // this array stores the news items

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.deleteExpiredNews(); // deteles the expired news from the database
    this.getNews(); // load the news after deleting expired ones
  }

  getNews() {
    this.newsService.getAllNews().subscribe(( data: any) => {
      if ( data ) {
        this.newsList = data; // set the returned news array to the newsList
      } else {
        // error handling
      }
    });
  }

}
