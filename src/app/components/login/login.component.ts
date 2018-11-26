import { Component, OnInit, OnDestroy} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {LoggerService} from '../../core/services/loggerService/logger.service';
import { UserService } from '../../core/services/users/user.service';
import {Subject} from 'rxjs';
import{takeUntil} from 'rxjs/operators' 
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';



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
export class LoginComponent implements OnInit, OnDestroy{

  constructor(private userService: UserService,public message: MatSnackBar,
    public router : Router, public dataService: DataSharingService) { 
   
  }
  userLogin = {
    "email": '',
    "password" : ''
  }
  destroy$: Subject<boolean> = new Subject<boolean>();
  private reg : string = "[a-z0-9]+[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  private display : boolean = true;
  private value : boolean = true;
  private forgotPassword : boolean = true;
  private emptyEmail: string = '';
  emptyPassword = '';
  confirmPassword='';
  userName = '';
  ngOnInit() { 
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
    }
    this.dataService.currentMessage.subscribe(message => {
      this.notify(message);
     })
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
    this.userService.userPost('login',this.userLogin)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {     
        localStorage.setItem('token',data['id']);  
        localStorage.setItem('userId',data['userId']); 
        localStorage.setItem('imageUrl',data['imageUrl']); 
        localStorage.setItem('userName',data['firstName']);
        localStorage.setItem('email',data['email']);  
        this.registerPushToken();      
      });
  }

  registerPushToken() {
    var token = localStorage.getItem('token');
    var reminderToken = localStorage.getItem('reminderToken');
    this.userService.userPostService('registerPushToken',{"pushToken":reminderToken})
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.router.navigateByUrl('/home');    
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
      this.userService.userPost('reset',this.reset)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
       this.reset.email = ''
        this.message.open('Password resetLink sent to your mail', 'Reset', {
          duration: 5000,
        });
        // error => LoggerService.log('Error :' + error);       
      });
    }
    else if (this.reset.email == '') {
      this.confirmPassword = 'Enter your email '
    }
    else {
      this.confirmPassword = 'Enter registered email '
    }
  }

  notify(message) {
    this.userLogin.password = '';
    this.message.open( message, 'Retry', {
      duration: 500,
    });

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 
}
