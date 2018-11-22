import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { HttpService } from '../../core/services/httpService/http.service';
import { MatDialog } from '@angular/material';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component';
import { ImageCropDialogComponent } from '../image-crop-dialog/image-crop-dialog.component';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import{environment} from '../../../environments/environment'



@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.scss']
})


export class HomeNavigationComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private userService: HttpService,
    public dialog: MatDialog, public dataService: DataSharingService, private route: ActivatedRoute) {
    this.dataService.eventEmitted.subscribe(message => {
      if (message) {
        this.getLabel();
      }
    })
    this.dataService.identityEventEmitted.subscribe(message => {
      if (message) {
        this.identify = message;
        localStorage.setItem('identify', message)
      }
    })
  }

  destroy$: Subject<boolean> = new Subject<boolean>();
  private searchText: string;
  private identify: string = 'fundooNotes';
  private userName: string = '';
  private email: string = '';
  private token: string = '';
  private userId: string;
  private labelList;
  private selectedFile: File;
  private selectedFileName: string;
  private notesView: boolean = true;
  private server_url = environment.baseUrl;
  private labelData = {
    "label": "string",
    "isDeleted": false,
    "userId": "string"
  }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('userId');
    if (localStorage.getItem('identify') != undefined) {
      this.identify = localStorage.getItem('identify');
    }
    this.getLabel();
  }

  logout() {
    this.userService.userLogout('api/user/logout')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        localStorage.removeItem('token');
        localStorage.removeItem('imageUrl');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        this.router.navigateByUrl('/login');
      });
    error => LoggerService.log('Error :' + error);
  }

  naviagteSearch() {
    this.router.navigate(['home/search']);
  }

  dataTransfer() {
    this.dataService.changeMessage(this.searchText)
  }

  getLabel(): void {
    this.userService.getNotesList('api/noteLabels/getNoteLabelList')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.labelList = [];
        for (let index = 0; index < data['data'].details.length; index++) {
          if (data['data'].details[index].isDeleted == false) {
            this.labelList.push(data['data'].details[index])
          }
        }
        this.labelList.sort((a, b) => a.label.localeCompare(b.label));
      });
    error => LoggerService.log('Error :' + error);
  }
  updateLabel(data): void {
    var labelName = data.label
    this.userService.postServiceAuthentication("api/noteLabels/" + data.id + '/updateNoteLabel', data,)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getLabel();
        this.dataService.changeMessage(labelName)
        this.dataService.eventTrigger(true);
      });
    error => LoggerService.log('Error :' + error);
  }

  createNewLabel(labelData): void {
    this.userService.postServiceAuthentication('api/noteLabels', labelData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getLabel();
      });
    error => LoggerService.log('Error :' + error);
  }
  createLabel(): void {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
      width: '300px',
      panelClass: 'myapp-no-padding-dialog',
      data: { label: this.labelList }
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        this.getLabel();
      }
    });

    const sub1 = dialogRef.componentInstance.onEdit.subscribe((data) => {
      this.updateLabel(data)
    });

    const sub2 = dialogRef.componentInstance.toCreate.subscribe((data) => {
      this.labelData.label = data;
      this.labelData.userId = this.userId;
      this.createNewLabel(this.labelData)

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (!this.labelList.some((data) => data.label == result)) {
          this.labelData.label = result;
          this.labelData.userId = this.userId;
          this.createNewLabel(this.labelData)
        }
        else {
          LoggerService.log('label name already exits');
        }
      }

    });
  }

  changeIdentity(data) {
    this.searchText = '';
    localStorage.setItem('identify', data)
    this.identify = data;
  }
  savedUrl = localStorage.getItem('imageUrl');
  url = this.server_url + this.savedUrl;
  onImageUpload(event) {
    this.selectedFile = event.path[0].files[0];
    this.imageUpload();
  }

  imageUpload(): void {
    const dialogRef = this.dialog.open(ImageCropDialogComponent, {
      width: '700px',
      height: '500px',
      data: { urlEvent: this.url }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.selectedFile = result;
        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile);
        this.userService.imageUpload('api/user/uploadProfileImage', uploadData)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.savedUrl = data['status'].imageUrl;
            localStorage.setItem('imageUrl', data['status'].imageUrl);
            this.url = this.server_url + this.savedUrl;
          });
        error => LoggerService.log('Error :' + error); 
      }

    });
  }

  changeView() {
    this.notesView = !this.notesView;
    this.dataService.listEventTrigger(true);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 
}