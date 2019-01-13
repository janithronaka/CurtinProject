import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcoService } from '../../exco-members/exco.service';

@Component({
  selector: 'app-homepage-sidebar',
  templateUrl: './homepage-sidebar.component.html',
  styleUrls: ['./homepage-sidebar.component.css']
})
export class HomepageSidebarComponent implements OnInit {

  public imagesUrl;
  id = 'id';
  name = 'name';
  sessionID: any;
  login = false;
  sessionName: any;
  isAdmin = false;
  isAccountent = false;

  constructor(
    private router: Router,
    private excoService: ExcoService
  ) { }

  ngOnInit() {
    this.sessionID = sessionStorage.getItem(this.id);
    this.sessionName = sessionStorage.getItem(this.name);

    if (this.sessionID == null) {
            this.login = false;
    } else if (this.sessionID != null) {
      this.login = true;
      console.log('home login ' + this.login);
     // this.ngOnInit();

    }

    this.excoService.getByMemId(this.sessionID).subscribe((data: any) => {
     if (data.position == 'Admin') {
       this.isAdmin = true;
     } else if (data.position == 'Accountent') {
       this.isAccountent = true;
       console.log(this.isAccountent);
     }
    });


   }

   logout() {
     sessionStorage.clear();
     this.ngOnInit();
     // reload page after logged in
    // location.reload();
    this.router.navigate(['/home-page']);
    this.isAdmin = false;
    this.isAccountent = false;

   }

   signup() {
     this.router.navigate(['/sign-up']);
   }
}
