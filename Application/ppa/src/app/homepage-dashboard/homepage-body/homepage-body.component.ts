import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../admin-news/news.service';
import { News } from '../../admin-news/news.model';
import { ProjectModel } from '../../project/project.model';
import { ProjectService } from '../../project/project.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { getDayView } from 'calendar-utils';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-homepage-body',
  templateUrl: './homepage-body.component.html',
  styleUrls: ['./homepage-body.component.css']
})
export class HomepageBodyComponent implements OnInit {

  // news and project array declaration
  newsList = [] as News[];
  projectList = [] as ProjectModel[];
  arrNews = [] as any;
  arrProject = [] as any;
  calender = [] as any;
  date: Date = new Date();
  newDate: any;
  hiddnDate: any;
  selectedDate: any;


  formatsDateTest: string[] = [
  'yyyy-M-dd'
  ];

  public imagesUrl;

  constructor(
    private newsService: NewsService,
    private projectService: ProjectService,
    public Calander: CalendarModule,
    private dateAdaptor: DateAdapter,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    // image slder
    this.imagesUrl = [
      '../../assets/icons/1.jpg',
      '../../assets/icons/2.jpg',
      '../../assets/icons/3.jpg',
      '../../assets/icons/4.jpg',
      '../../assets/icons/5.jpg',
      '../../assets/icons/6.jpg',
      '../../assets/icons/7.jpg',
      '../../assets/icons/8.jpg',
      '../../assets/icons/9.jpg',
      '../../assets/icons/10.jpg'
    ];
    // get the news and projects
    this.newsService.deleteExpiredNews();
    this.getNews();
    this.getProject();
    // this.getDate();

    this.getProjects();
    this.calender = '2018-11-25';

  }

  // call for get all news
  getNews() {
    this.newsService.getAllNews().subscribe(( data: any) => {
      if ( data ) {
        this.arrNews = data;
        this.newsList = this.arrNews.reverse();
       // this.newsList = this.arrNews.r;
      }
    });
  }

  // call for get all projects
  getProject() {
    this.projectService.getProjects().subscribe((data: any) => {
      if (data) {
        this.arrProject = data;
        this.projectList = this.arrProject.reverse();
      }
    });
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }



  selectedChange($event) {
    console.log($event);
   this.selectedDate = this.datePipe.transform($event, 'yyyy-M-dd');


    this.projectService.getProjects().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        console.log(this.datePipe.transform(data[i].createdDate, 'yyyy-M-dd'));

        if (this.selectedDate == this.datePipe.transform(data[i].createdDate, 'yyyy-M-dd')) {
          console.log(data[i]);
          console.log(data[i].name);
          this.snackBar.open('Poroject Name :- ' + data[i].name, 'Close', {
            duration: 2000,
          });
        }
      }
    });
  }

getProjects() {
  this.projectService.getProjects().subscribe((data: any) => {
    for (let i = 0; i < data.length; i++) {
      this.calender = this.datePipe.transform(data[i].createdDate, 'yyyy-M-dd');

    }
  });
}

user($event) {
  console.log($event);
}

}
