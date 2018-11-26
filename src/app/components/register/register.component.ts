import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {LoggerService} from '../../core/services/loggerService/logger.service';
import { UserService } from '../../core/services/users/user.service';
import {Subject} from 'rxjs';
import{takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  newServices;
  private display: string = 'first';
  private display1: boolean = true;
  private service: string = '';
  private fieldsEmpty: string = '';
  private confirmPassword: string = '';
  private valid: boolean = false

  user = {
    "firstName": '',
    "lastName": '',
    "service": '',
    "email": '',
    "emailVerified": true,
    "password": ''
  }

  constructor(private userService: UserService,private router: Router,public snackBar: MatSnackBar) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit() {  
    this.showService(); 
  }


  showService() {
      this.userService.userGetService('service')
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) =>  {
          console.log(data);
          
          this.newServices= data.data.data;
        //  error => LoggerService.log('Error :' + error);
        });
    }

    userSignup() {

      this.userService.userPost('userSignUp',this.user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.snackBar.open('Registered successfully..!!','redirecting to login',{
          duration: 1000,
        });  
        setTimeout(()=>{ 
          this.router.navigateByUrl('/login');
         }, 1100)       
      });
      
    }

    onClickChange(select){
      this.service=select.name;
      select.first=true;
      for(var i=0;i<this.newServices.length;i++)
      {
        if(select.name==this.newServices[i].name){
          continue;
        }
        this.newServices[i].first=false;
      }
    }

    newUser() {
      if (this.user.email != '' && this.user.password != '' && this.service != '' ) {
        this.user.service = this.service
        this.userSignup();         
      }
      else {
          this.fieldsEmpty = 'Enter your details';      
      }
    }
    ngOnDestroy() {
      this.destroy$.next(true);
       this.destroy$.unsubscribe();   
     }
}
