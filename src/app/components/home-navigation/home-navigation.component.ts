import { Component,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../core/services/httpService/http.service';
import { MatDialog} from '@angular/material';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { Router } from '@angular/router'
 
@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.scss']
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
      })
      this.dataService.identityEventEmitted.subscribe(message => {
        console.log(message);  
        if (message) {
         this.identify = message;
        } 
      })
    }
  searchText:string;
  identify: string;
  userName: string = ''; 
  email: string='';
  token: string=''; 
  userId: string;
  labelList;
  notesView: boolean = true;
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
    this.identify = 'fundooNotes'
    
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
      this.getLabel(); 
      this.dataService.eventTrigger(true)
      });
      error => console.log('Error ', error);
  }

  createNewLabel(labelData): void {
    this.userService.postServiceAuthentication('api/noteLabels',labelData,this.token)
    .subscribe(data => {
      console.log(data);
      this.getLabel();
      });
      error => console.log('Error ', error);
  }
  createLabel(): void {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
      width: '300px',
      panelClass: 'myapp-no-padding-dialog',
      data: {label:this.labelList}
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        this.getLabel(); 
      }  
    });

    const sub1 = dialogRef.componentInstance.onEdit.subscribe((data) => {
     console.log(data);
     this.updateLabel(data)
    });

    const sub2 = dialogRef.componentInstance.toCreate.subscribe((data) => {
      console.log(data);
      this.labelData.label = data;
      this.labelData.userId = this.userId;
      this.createNewLabel(this.labelData)
     
     }); 

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined) {
        if (!this.labelList.some((data) => data.label == result)) {
          console.log('create new label');
          this.labelData.label = result;
          this.labelData.userId = this.userId;
          this.createNewLabel(this.labelData)
        }
        else {
          console.log('label name already exits');
          
        }
      }
     
    });
} 

changeIdentity(data) {
  this.searchText= '';
  this.identify = data;
}
selectedFile : File; 
selectedFileName : string;
savedUrl = localStorage.getItem('imageUrl');
url= "http://34.213.106.173/"+this.savedUrl;
onImageUpload(event){
this.selectedFile = event.path[0].files[0];
this.imageUpload(); 
} 

imageUpload(): void {
  const dialogRef = this.dialog.open(ImageCropDialogComponent, {
    width: '700px',
    height: '500px',
    data: {urlEvent:this.url}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
   if (result != undefined) {
    this.selectedFile = result;
     const uploadData = new FormData();
     uploadData.append('file', this.selectedFile);
     this.userService.imageUpload('api/user/uploadProfileImage', uploadData, this.token)
       .subscribe(data => {
         this.savedUrl = data['status'].imageUrl;
         localStorage.setItem('imageUrl', data['status'].imageUrl);
         this.url = "http://34.213.106.173/" + this.savedUrl;
       });
     error => console.log('Error ', error);
   }

  });
} 

changeView() {
  this.notesView = !this.notesView;
  this.dataService.listEventTrigger(true);
}
}