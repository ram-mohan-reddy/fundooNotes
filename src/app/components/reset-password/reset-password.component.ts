import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { UserService } from '../../core/services/users/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserService,public route:ActivatedRoute ,public message: MatSnackBar) { }

  newData = {
    "newPassword": ''
  }

  ifEmpty = ''

  public token=this.route.snapshot.params.id;

  confirmNewPassword = '';

  ngOnInit() {
  }
  
  
  setNewPassword() {
    if ((this.newData.newPassword == this.confirmNewPassword)&& this.newData.newPassword!=''&& this.confirmNewPassword != '') {

      this.changePassword();
      
    }

    else {
      this.ifEmpty = 'Enter password'
    }
  }

  changePassword(){
    this.userService.userPostService('reset-password',this.newData)
    .subscribe(data => {

      this.newData.newPassword = '';
      this.confirmNewPassword = ''
      this.message.open('Password updated', 'Success', {
        duration: 5000,
      });
      error => {LoggerService.log('Error :' + error); 
      this.message.open('Process failed', 'Sorry.!', {
        duration: 5000,
      });     
    }

    });
  }
}
 