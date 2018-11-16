import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpService } from '../../core/services/httpService/http.service';
import {MatSnackBar} from '@angular/material';

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

  constructor(private userService: HttpService,public message: MatSnackBar) { }
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
      console.log(this.userLogin.password);  
      this.emptyPassword = "Enter password"    
    }
    else {
      this.login();
    }
  }
  login() {
    this.userService.postService('api/user/login',this.userLogin)
      .subscribe(data => {
        console.log(data);
        console.log(data.id);     
        localStorage.setItem('token',data['id']);  
        localStorage.setItem('userId',data['userId']); 
        localStorage.setItem('imageUrl',data['imageUrl']);    
        var token = localStorage.getItem('token');
        var reminderToken = localStorage.getItem('reminderToken');
        this.userService.postServiceAuthentication('api/user/registerPushToken',{
        "pushToken":reminderToken
        },token)
        .subscribe(data => {
          this.uesrData();
          error => console.log('Error ', error);       
        });
        error => console.log('Error ', error);       
      });
  }

  uesrData() {
    this.userService.getService('api/user')
    .subscribe(data => {
      data.forEach(element => {
        if (element.email == this.userLogin.email) {
        this.userName = element.firstName;
          localStorage.setItem('userName',this.userName);
          localStorage.setItem('email',this.userLogin.email);
          window.location.replace('home')
        } 
      });
      error => console.log('Error ', error);       
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
    console.log(this.reset.email);
    console.log(this.userLogin.email);
    if (this.reset.email == this.userLogin.email) {
      console.log(this.reset);
      this.userService.postService('api/user/reset',this.reset)
      .subscribe(data => {
        console.log(data);
       this.reset.email = ''
        this.message.open('Password resetLink sent to your mail', 'Reset', {
          duration: 5000,
        });
        error => console.log('Error ', error);       
      });
    }
    else if (this.reset.email == '') {
      this.confirmPassword = 'Enter your email '
    }
    else {
      this.confirmPassword = 'Enter registered email '
      console.log('Enter registered email');
      
    }
  }
}
