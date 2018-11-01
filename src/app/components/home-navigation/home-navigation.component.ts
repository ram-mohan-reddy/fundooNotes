import { Component,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { MatDialog} from '@angular/material';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component'
import { DataSharingService } from '../../services/data-sharing.service';
import { Router } from '@angular/router'
 
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
    
  constructor(private breakpointObserver: BreakpointObserver,private router: Router,private userService: HttpService,
    public dialog: MatDialog,public dataService: DataSharingService) {
      this.dataService.eventEmitted.subscribe(message => {
        console.log(message);  
        if (message) {
          this.getLabel();
        } 
        // this.getLabel();
      })
    }
  searchText;
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
 
  naviagteSearch() {
this.router.navigate(['home/search']);
  }

  dataTransfer(){
    console.log(this.searchText);
    
    this.dataService.changeMessage(this.searchText)
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
  updateLabel(data):void {
    this.userService.postServiceAuthentication("api/noteLabels/"+ data.id +'/updateNoteLabel',data,this.token)
    .subscribe(data => {
      console.log(data);
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
    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      alert('label will be deleted permanently');
      if (data) {
        this.getLabel(); 
      }  
    });

    const sub1 = dialogRef.componentInstance.onEdit.subscribe((data) => {
     console.log(data);
     this.updateLabel(data)
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined) {
        this.labelData.label = result;
        this.labelData.userId = this.userId;
        this.userService.postServiceAuthentication('api/noteLabels',this.labelData,this.token)
        .subscribe(data => {
          console.log(data);
          this.getLabel();
          });
          error => console.log('Error ', error);
      }
     
    });
}
}