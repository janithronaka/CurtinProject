import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MembershipService } from 'src/app/new-membership/membership/membership.service';
import { Membership } from 'src/app/new-membership/membership/membership.model';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    hide = true;
    loginList = [] as Login[];
    memberID: any;
    memberPass: any;
    loginBtnName: any;
    LoginForm: any;
    count: any;
    id = 'id';
    sessionID: any;
    login = false;
    memberName: any;
    values: any;
    name = 'name';
    sessionName: any;

  constructor(
    public loginService: LoginService,
    private FlashMessage: FlashMessagesModule,
    private router: Router,
    private snackBar: MatSnackBar,
    private membershipService: MembershipService
    ) { }

  ngOnInit() {}

    onLogin(form: NgForm) {


      this.loginService.getMember(this.memberID).subscribe((data2: any) => {

        if (data2 == null) {
          this.snackBar.open('Invalid User', 'Close', {
            duration: 2000,
          });

        } else {
          this.memberName = data2.memberName;
          this.loginService.getLogin(this.memberID).subscribe(( data: any) => {

          if (data.password != this.memberPass) {

            this.snackBar.open('Invalid member password', 'Close', {
              duration: 2000,
            });


            } else if (data.password === this.memberPass) {
              this.membershipService.getMembershipByMemberId(this.memberID).subscribe((member: Membership) => {
                if (member.dataType.toLowerCase() === 'profile') {
                  location.reload();
              this.snackBar.open('Welcome ' + data.memberID, 'Close', {
                duration: 2000,
              });

            sessionStorage.setItem(this.id, this.memberID);
            this.sessionID = sessionStorage.getItem(this.id);

            sessionStorage.setItem(this.name, this.memberName);
            this.sessionName = sessionStorage.getItem(this.name);

            this.login = true;

           // console.log('login login ' + this.login);
            this.router.navigate(['/home-Mainpage']);
                } else {
                  this.snackBar.open('Invalid User', 'Close', {
                    duration: 2000,
                  });
                }
              });
               // reload page after logged in





            }

    });

        }


      });


    }

    getLogins() {
      this.loginService.getAllLogins().subscribe(( data: any) => {
        console.log(data);
        if (data) {
          this.loginList = data;
        }
      });
    }

    logout() {
      sessionStorage.clear();
      this.login = false;
    }


}
