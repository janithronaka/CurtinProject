import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login-reset-code',
  templateUrl: './login-reset-code.component.html',
  styleUrls: ['./login-reset-code.component.css']
})
export class LoginResetCodeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
  ) { }

  code: any;
  new_pass: any;
  con_pass: any;
  member_id: any;
  mem_code: any;
  mem_email: any;


  ngOnInit() {

  }


  frmSubmit(form: NgForm) {
    this.getCode();
    console.log('sadasd');
  }

  public getCode() {
    let id = '';
    id = sessionStorage.getItem('Mem_id');
    this.member_id = id.substr(3);
    this.loginService.getLogin(this.member_id).subscribe(( data: any) => {
    this.mem_code = data.code;
    this.mem_email = data.email;

      if (this.code != this.mem_code) {

         this.snackBar.open('Entered code invalid', 'Close', {
          duration: 2000,
        });

      } else if (this.code == this.mem_code) {

        this.loginService.editLogin(this.member_id, this.mem_email, this.new_pass, null);

        this.snackBar.open('Password has reset! Please login.', 'Close', {
          duration: 2000,
        });
      }

    });
  }

}
