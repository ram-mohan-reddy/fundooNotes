import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger } from '@angular/material';
import{environment} from '../../../environments/environment'
import { UserService } from '../../core/services/users/user.service';

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public userService:UserService) { }

  private savedUrl:string='';
  private url:string='';
  private email:string='';
  private userName:string='';
  private personSearch:string='';
  private server_url = environment.baseUrl;
  private show:boolean = false;
   userArray:any=[];
  @ViewChild(MatMenuTrigger) showList: MatMenuTrigger;
  ngOnInit() {
    this.savedUrl = localStorage.getItem('imageUrl');
  this.url = this.server_url + this.savedUrl;
  this.email = localStorage.getItem('email');
  this.userName = localStorage.getItem('userName');
  }

  onKey() {
    if (this.personSearch != '') {
      this.showList.openMenu();
      this.show = true
      let search = {
        'searchWord' : this.personSearch
      }
      this.userService.userPostService('searchUserList',search)
      .subscribe(data => {
        console.log(data);
        this.userArray = data['data']['details'];
      console.log(this.userArray);
      });
    }
  }

getEmail(receiverEmail){

  this.personSearch = receiverEmail;
  console.log(receiverEmail);
  let index = this.userArray.findIndex(x => x.email== receiverEmail);
  console.log(this.userArray[index]);
  

}


}
