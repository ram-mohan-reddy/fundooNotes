import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpService } from '../../core/services/httpService/http.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(50%)' }),
        animate(100)
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  constructor(private userService: HttpService,public message: MatSnackBar,public router : Router) { }
  userLogin = {
    "email": '',
    "password" : ''
  }
  reg = "[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  display = true;
  value = true;
  forgotPassword = true;
  emptyEmail = '';
  emptyPassword = '';
  confirmPassword='';
  userName = '';
  ngOnInit() { 
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
  }
  toggle() {
    this.display = !this.display;

    if (/[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.userLogin.email)) {
      this.value = false;  
    }
    else if (this.userLogin.email == '') {
      this.emptyEmail = 'Enter an email'
    }  
  } 
  toggle1() {
    if (this.userLogin.password == '') {
      this.emptyPassword = "Enter password"    
    }
    else {
      this.login();
    }
  }
  login() {
    this.userService.postService('api/user/login',this.userLogin)
      .subscribe(data => {     
        localStorage.setItem('token',data['id']);  
        localStorage.setItem('userId',data['userId']); 
        localStorage.setItem('imageUrl',data['imageUrl']); 
        localStorage.setItem('userName',data['firstName']);
        localStorage.setItem('email',data['email']);
        var token = localStorage.getItem('token');
        var reminderToken = localStorage.getItem('reminderToken');
        this.userService.postServiceAuthentication('api/user/registerPushToken',{
        "pushToken":reminderToken
        },token)
        .subscribe(data => {
          this.router.navigateByUrl('/home');
          error => LoggerService.log('Error :' + error);      
        });
        error => LoggerService.log('Error :' + error);       
      });
  }
  reset = {
    "email": '',
  }
  userForgotPassword() {       
    this.forgotPassword = false  
  }
  return(){
    this.forgotPassword = true
  }
  forgotPasswordLink() {
    if (this.reset.email == this.userLogin.email) {
      this.userService.postService('api/user/reset',this.reset)
      .subscribe(data => {
       this.reset.email = ''
        this.message.open('Password resetLink sent to your mail', 'Reset', {
          duration: 5000,
        });
        error => LoggerService.log('Error :' + error);       
      });
    }
    else if (this.reset.email == '') {
      this.confirmPassword = 'Enter your email '
    }
    else {
      this.confirmPassword = 'Enter registered email '
    }
  }
}
