import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { HttpService } from '../../services/http.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: HttpService,public route:ActivatedRoute ,public message: MatSnackBar) { }

  newData = {

    "newPassword": ''

  }

  ifEmpty = ''

  public token=this.route.snapshot.params.id;

  confirmNewPassword = '';

  ngOnInit() {
    console.log(this.token);
  
  }
  
  
  setNewPassword() {
    if ((this.newData.newPassword == this.confirmNewPassword)&& this.newData.newPassword!=''&& this.confirmNewPassword != '') {
      console.log("passwords are same");
      
      this.changePassword();
      
    }

    else {
      console.log('Enter details');
      this.ifEmpty = 'Enter password'
    }
  }

  changePassword(){
    this.userService.resetPassword('api/user/reset-password',this.newData,this.token)
    .subscribe(data => {

      this.newData.newPassword = '';
      this.confirmNewPassword = ''
      console.log(data);
      this.message.open('Password updated', 'Success', {
        duration: 5000,
      });
     
      error => {console.log('Error ', error); 
      this.message.open('Process failed', 'Sorry.!', {
        duration: 5000,
      });     
    }

    });
  }
}
 