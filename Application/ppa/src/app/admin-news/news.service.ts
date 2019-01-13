import { Injectable } from '@angular/core';
import { News } from './news.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class NewsService {

  constructor (private http: HttpClient) {}

  getAllNews() {
    return this.http.get('/api/news/all');
  }

  addNews(title: any, description: any, exDate: any, link: string) {
    const newNews: News = {
      _id: null,
      title: title,
      description: description,
      exDate: exDate,
      link: link
    };
    this.http.post<{ status: any, message: any }>('/api/news', newNews).subscribe();
  }

  saveNews(id: any, title: any, description: any, exDate: any, link: string) {
    console.log('ID: ' + id);
    const newNews: News = {
      _id: id,
      title: title,
      description: description,
      exDate: exDate,
      link: link
    };
    this.http.put<{ status: any, message: any }>('/api/news/', newNews).subscribe();
  }

  deleteNews(newsId: any) {
    this.http.delete('/api/news/' + newsId).subscribe();
  }

  deleteExpiredNews() {
    let newsList: News[] = [];
    const today = new Date();
    this.getAllNews().subscribe((newsData: News[]) => {
      if (newsData) {
        newsList = newsData;
        newsList.forEach(news => {
          if (news.exDate) {
            const expDate = new Date(news.exDate);
            if (expDate < today) {
              this.deleteNews(news._id);
            }
          }
        });
      }
    });
  }
}
