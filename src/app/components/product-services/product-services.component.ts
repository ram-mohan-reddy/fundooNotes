import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/users/user.service';

@Component({
  selector: 'app-product-services',
  templateUrl: './product-services.component.html',
  styleUrls: ['./product-services.component.scss']
})
export class ProductServicesComponent implements OnInit {

  constructor(private userService: UserService) { }
  private service: string = '';
  private newServices = []
  ngOnInit() {
    this.userService.userGetService('service')
        .subscribe((data) =>  {
          console.log(data);
          
          this.newServices= data.data.data;
        //  error => LoggerService.log('Error :' + error);
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
}
