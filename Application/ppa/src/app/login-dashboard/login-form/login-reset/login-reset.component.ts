import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MailModel } from './mail.model';
import { MailService } from './mail.service';
import { LoginService } from '../login.service';
import { Subject, from } from 'rxjs';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-login-reset',
  templateUrl: './login-reset.component.html',
  styleUrls: ['./login-reset.component.css']
})
export class LoginResetComponent implements OnInit {

  newEmail: MailModel;
  member_id: any;
  random: any;
  subject: any;
  maillist = [] as MailModel[];
  constructor(private router: Router,
    public loginService: LoginService,
    private mailService: MailService,
    private snackBar: MatSnackBar,
    private route: Router) { }
    memberEmail: String;
    email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {


  }

  getErrorMessage() {
    // email format validation
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  sendEmail(form: NgForm) {
    if (this.email.valid) {
      // check if imail format valid and it is recorded in database
      this.loginService.getLogin(this.member_id).subscribe((data: any) => {
        if (this.email.value != data.email) {

         alert('Invalid Email');
        } else {
            // genarating a random number to send
             this.random = (Math.floor(100000 + Math.random() * 900000)).toString();
             this.subject = 'Password Reset Request';

             // creating a object to send through email service
             const send = {
              to: this.email.value,
              subject: this.subject,
              body: 'Passsword reset code is ' + this.random
             };

             // store code in database
             this.loginService.getLogin(this.member_id).subscribe(( data: any) => {
             this.loginService.editLogin(this.member_id, data.email, data.password,  this.random);
             });

             sessionStorage.setItem('Mem_id', 'ID:' + this.member_id);
             // message will appear after email sent
             this.mailService.sendEmail(send).subscribe((data) => {
              this.snackBar.open('Email sent to ' + send.to, 'Close', {
                duration: 2000,
              });

            });

            this.router.navigate(['/login-reset-code']);

        }
      });

    }

  }

}
