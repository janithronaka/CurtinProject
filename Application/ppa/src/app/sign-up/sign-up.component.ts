import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray, AbstractControl} from '@angular/forms';
import { SignupService } from './signup.service';
import { Signup } from './signup.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../login-dashboard/login-form/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  len = true;
  con_empty = true;
  pass_empty = true;
  signupGroup: FormGroup;
  memID: any;
  pass: any;
  con_pass: any;
  email: any;
  length = true;

  constructor(
    public signupService: SignupService,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.length = true;
  }

  onSubmit() {
      // if password length less than 5 show bellow message
      if (this.length == false) {
        this.snackBar.open('Password must contain atleest 5 charactors', 'Close', {
          duration: 2000,
        });
      } else {

      // call check id method to check member enterd id in before hit submit
      this.checkID();
      // cheking passwords are equal
      if (this.pass != this.con_pass) {

        this.snackBar.open('Passwords are not matching', 'Close', {
          duration: 2000,
        });

      } else {
        // check memberd id alredy in database
        this.loginService.getLogin(this.memID).subscribe((data: any) => {
          if (data != null) {
            this.snackBar.open('Login alredy exists, please login', 'Close', {
              duration: 2000,
            });
          } else {
              // if all the details are valid create login
              this.signupService.addLogin(this.memID, this.email, this.con_pass);
              this.snackBar.open('Login successfully created', 'Close', {
                duration: 2000,
              });

          }
        });
      }
    }

  }

  checkID() {
   // console.log(this.memID);
    this.signupService.getMember(this.memID).subscribe((data: any) => {
      if (data == null) {
        this.snackBar.open('Invalid member id', 'Close', {
          duration: 2000,
        });
      } else {
       // console.log(data);
        this.email = data.personalEmail;
      }
    });
  }

  // check password length is lessthan 5
  check_pass() {
    if (this.pass.length < 5) {
      this.length = false;
      this.snackBar.open('Password must contain atleest 5 charactors', 'Close', {
        duration: 2000,
      });

    } else if (this.pass.length >= 5) {
      this.length = true;
    }
  }

}
