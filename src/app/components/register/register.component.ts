import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpService/http.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newServices;
  display = 'first';
  display1 = true;
  service;
  fieldsEmpty;
  confirmPassword = '';
valid = false

  user = {
    "firstName": '',
    "lastName": '',
    "service": '',
    "email": '',
    "emailVerified": true,
    "password": ''
  }

  constructor(private userService: HttpService,private router: Router,public snackBar: MatSnackBar) { }

  ngOnInit() {  
    this.showService(); 
  }


  showService() {
      this.userService.getService('api/user/service')
        .subscribe((data) =>  {
          console.log('Data about Service',  data.data.data);
          this.newServices= data.data.data;
         error => console.log('Error ', error);
        });
    }

    userSignup() {

      this.userService.postService('api/user/userSignUp',this.user)
      .subscribe(data => {
        console.log(data);
       
        this.snackBar.open('Registered successfully..!!','redirecting to login',{
          duration: 500,
        });   
        this.router.navigateByUrl('/login');     
      });
      
    }

    onClickChange(select){
      console.log(select.name);
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
}
