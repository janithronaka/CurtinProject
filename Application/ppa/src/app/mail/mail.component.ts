import { Component, OnInit } from '@angular/core';
import { MailModel } from './mail.model';
import { MailService } from './mail.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  newEmail: MailModel
  constructor(private mailService: MailService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.newEmail = {
      subject: '',
      body: '',
      to: '',
      from: ''
    }
  }

  sendEmail(form: NgForm) {
    this.mailService.sendEmail(form.value).subscribe((data) => {
      this.snackBar.open('Email sent to ' + this.newEmail.to, 'Close', {
        duration: 2000,
      });
    })
  }

}
