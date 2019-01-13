import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-dashboard/login-form/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  crr_pass: any;
  pass: any;
  con_pass: any;
  member_id: any;
  length = true;
  con_empty = true;
  email: any;
  id_exsits: any;


  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.member_id = sessionStorage.getItem('id');

   // this.id_exsits = false;
  }

  onSubmit() {

   // this.checkID();

    if (this.pass != this.con_pass) {
      this.snackBar.open('Entered passwords are not matched', 'Close', {
        duration: 2000,
      });
    } else if (this.pass.length < 5) {
      this.length = false;
      this.snackBar.open('Password must contain atleest 5 charactors', 'Close', {
        duration: 2000,
      });
    } else if (this.pass == this.con_pass && this.pass.length >= 5) {

       this.checkID();
        console.log('test test');


    }

  }

  checkID() {


    this.loginService.getLogin(this.member_id).subscribe((data: any) => {

      if (this.crr_pass != data.password) {
        this.snackBar.open('Incorrect password', 'Close', {
          duration: 2000,
        });
      } else {
        this.loginService.editLogin(this.member_id, this.email, this.pass, null);
        this.snackBar.open('Password has reset!', 'Close', {
          duration: 2000,
        });
      }

       // this.email = data.email;
      //  this.id_exsits = true;


    });
  }

  check_length() {
    if (this.pass.length < 5) {
      this.length = false;
      this.snackBar.open('Password must contain atleest 5 charactors', 'Close', {
        duration: 2000,
      });
    }
  }

}
