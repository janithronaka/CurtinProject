import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage-dashboard',
  templateUrl: './homepage-dashboard.component.html',
  styleUrls: ['./homepage-dashboard.component.css']
})
export class HomepageDashboardComponent implements OnInit {

  login = false;
  sessionID: any;
  id = 'id';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    // this.router.navigate(['/home-page']);

   this.sessionID = sessionStorage.getItem(this.id);
   if (this.sessionID != null) {
     this.router.navigate(['/home-page']);

     console.log(this.sessionID);
   }

  }

}
