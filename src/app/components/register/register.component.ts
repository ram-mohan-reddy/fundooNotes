import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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

  constructor(private userService: HttpService) { }

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
        console.log(this.user);
        this.userSignup();         
      }

      else {

          this.fieldsEmpty = 'Enter your details';
          console.log('Enter your details');
       
        
        
      }
      
      
    }

    

}
