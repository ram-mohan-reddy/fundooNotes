import { Component,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { MatDialog} from '@angular/material';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component'

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css']
})


export class HomeNavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,private userService: HttpService,public dialog: MatDialog) {}

  userName: string = ''; 
  email: string='';
  token: string=''; 
  userId: string;
  labelList;
  labelData = {
    "label": "string",
    "isDeleted": false,
    "userId": "string"
  }

  ngOnInit() {

   console.log(localStorage.getItem('userName'));
   console.log(localStorage.getItem('email'));
   this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('userId');
    this.getLabel();
  }

  logout() {
   console.log(this.token);
   
    this.userService.userLogout('api/user/logout',this.token)
    .subscribe(data => {
      console.log(data);
      localStorage.clear();
    window.location.replace('login');
        
      });
      error => console.log('Error ', error);         
  }
  getLabel(): void {
    this.userService.getNotesList('api/noteLabels/getNoteLabelList',this.token)
    .subscribe(data => {
      console.log("get  :",data);
      this.labelList = [];
      for (let index = 0; index < data['data'].details.length; index++) {
        if (data['data'].details[index].isDeleted == false) {
          this.labelList.push(data['data'].details[index])
        }
      }
      
      });
      error => console.log('Error ', error);
  }
  createLabel(): void {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
      width: '300px',
      position: { top: '100px', left: '450px'},
      panelClass: 'myapp-no-padding-dialog',
      data: {label:this.labelList}
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      this.labelData.label = result;
      this.labelData.userId = this.userId;
      console.log(this.labelData.label);
      console.log(this.labelData.userId);
      console.log(this.labelData.isDeleted);
      console.log('The dialog was closed');

      this.userService.postServiceAuthentication('api/noteLabels',this.labelData,this.token)
      .subscribe(data => {
        console.log(data);
        this.getLabel();
        });
        error => console.log('Error ', error);
    });
 
}
}