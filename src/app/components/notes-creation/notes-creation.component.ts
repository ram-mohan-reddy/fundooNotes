/************************************************************************************************
*  Execution       :   1. default node         cmd> notes-creation.ts 
*        
*  Purpose         : To display small card & hiddencards & change color when clicked 
* 
*  Description    
* 
*  @file           : notes-creation.ts
*  @overview       : To display small card & hiddencards & change color when clicked 
*  @module         : notes-creation.ts - This is optional if expeclictly it's an npm or local package
*  @author         : ram-mohan-reddy <ram.mohan10595@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { MatSnackBar, MatMenuTrigger } from '@angular/material';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserService } from '../../core/services/users/user.service';
/**A componenet can be reused throughout the application & even in other applications */

@Component({
  /**A string value which represents the component on browser at execution time */
  selector: 'app-notes-creation',
  /**External templating process to define html tags in component */
  templateUrl: './notes-creation.component.html',
  /**It is used to provide style of components */
  styleUrls: ['./notes-creation.component.scss']
})
/**To use components in other modules , we have to export them */

export class NotesCreationComponent implements OnInit, OnDestroy {
  /**To be able to use our output we need to import & bind a new instance of the event emitter to it */

  constructor(private notesService: GetNotesService, private data: DataSharingService,
    public snackBar: MatSnackBar,public userService:UserService) { }
  listArray = [];
  listName: string;
  title : string = '';
  description : string = '';
  showCollaborator:string = '';
  public show: boolean = true;
  public checkList: boolean = false;
  token: string;
  colorCode = '';
  deleted: boolean = false;
  addMessage: boolean = false;
  myArray = [];
  selectLabelArray = [];
  selectRemainderArray = [];
  selectedReminder: string;
  labelArray = [];
  labelMenu: boolean = true;
  newLabelName: string;
  status: string = "open"
  userId = localStorage.getItem('userId');
  destroy$: Subject<boolean> = new Subject<boolean>();
  componentName = {
    'id': undefined,
  }
  reminderEdit = false;
  user = {
    roles: []
  };
  labelData = {/**body to be passed in hitting the api of labels */
    "label": "string",
    "isDeleted": false,
    "userId": "string"
  }
  notesContentData: any;
  notesContent = {/**body to be passed in hitting the api of notes cards */
    "file": File,
    "title": "",
    "description": "",
    "labelIdList": "",
    "checklist": "",
    "isArchived": false,
    "isPinned": false,
    "color": "",
    "reminder": "",
    "collaberators":""
  }

  noteArchive = {/**body to be passed in hitting the api of archive notes */
    "isArchived": false
  }
  /**Input and Output are two decorators in Angular responsible for communication between two components*/
  /**it is a interface */

  @Output() notesAdded = new EventEmitter<boolean>();
  todayDate: Date = new Date();
  tomorrowDate = new Date();
  private savedUrl:string='';
  private server_url = environment.baseUrl;
  private url:string='';
  private email:string='';
  private userName:string='';
  private personSearch:string='';
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() {
    this.getLabel();
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
    this.savedUrl = localStorage.getItem('imageUrl');
    this.url = this.server_url + this.savedUrl;
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');
  }
  /**callback will be invoked &data associated with the event will be given to us via $event property */
  receiveMessage(event) {
    if (event) {
      this.saveNote();
      this.show = !this.show;
      this.checkList = !this.checkList;
      this.labelArray = [];
      this.selectLabelArray = [];
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  /**callback will be invoked &data associated with the event will be given to us via $event property */
  receiveColor(event) {
    if (event) {
      this.colorCode = event;
    }
  }
  checkListArray = [];
  saveNote() {
    if (this.checkList == false) {
      this.notesContent.color = this.colorCode;
      this.notesContent.title = this.title;
      this.notesContent.description = this.description;
      if (this.selectLabelArray.length != 0) {
        this.notesContent.labelIdList = JSON.stringify(this.labelArray);
      }

      if (this.collaboratorList.length != 0) {
        this.notesContent.collaberators = JSON.stringify(this.collaboratorList);
        
      }
      if (this.selectedReminder != undefined) {
        this.notesContent.reminder = this.selectedReminder;
      }
      this.labelArray = [];
      this.selectLabelArray = [];
      this.collaboratorList = [];
      this.colorCode = '#ffffff';
      this.addNote(this.notesContent);
    }

    else {
      for (var i = 0; i < this.listArray.length; i++) {
        if (this.listArray[i].isChecked == true) {
          this.status = "close"
        }
        var listObject = {
          'itemName': this.listArray[i].listName,
          'status': this.status,
          'isDeleted': this.listArray[i].isDeleted
        }
        this.checkListArray.push(listObject);
        this.status = "open"
      }
      this.notesContent.color = this.colorCode;
      this.notesContent.title = this.title;
      this.notesContent.description = this.description;
      if (this.selectLabelArray.length != 0) {
        this.notesContent.labelIdList = JSON.stringify(this.labelArray);
      }
      if (this.selectedReminder != undefined) {
        this.notesContent.reminder = this.selectedReminder;
      }
      this.labelArray = [];
      this.selectLabelArray = [];
      this.colorCode = '#ffffff';
      this.notesContentData = {
        "title": this.notesContent.title,
        "labelIdList": this.notesContent.labelIdList,
        "checklist": JSON.stringify(this.checkListArray),
        "isArchived": this.notesContent.isArchived,
        "isPinned": this.notesContent.isPinned,
        "color": this.notesContent.color,
        "reminder": this.notesContent.reminder
      }
      this.addNote(this.notesContentData);
    }
  }

  addNote(notes) {
    this.notesService.notesPostCreate('api/notes/addNotes', notes)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.addMessage = true;
        this.notesAdded.emit(this.addMessage);
        this.notesContent.title = null;
        this.notesContent.description = null;
        this.notesContent.labelIdList = null;
        this.selectLabelArray = [];
        this.labelArray = [];
      });
    // error => LoggerService.log('Error :' + error);
    this.selectLabelArray = [];
    this.labelArray = [];
  }

  update() {
    this.saveNote()
    this.show = !this.show;
  }
  open(): void {
    this.show = !this.show;
    this.checkList = false;
  }

  onClick(value): void {
    if (!this.selectLabelArray.some((data) => data == value.label)) {
      this.selectLabelArray.push(value.label);
      this.labelArray.push(value.id)
    }
    else {
      const index: number = this.selectLabelArray.indexOf(value.label);
      if (index !== -1) {
        this.selectLabelArray.splice(index, 1);
        this.labelArray.splice(index, 1);
      }
    }
  }

  changeMenu() {
    if (this.labelMenu) {
      this.labelMenu = false
    }
    else {
      this.labelMenu = true
    }
  }
 
  cancelNoteLabel(labelId) {
    const index: number = this.selectLabelArray.indexOf(labelId);
    if (index !== -1) {
      this.selectLabelArray.splice(index, 1);
      this.labelArray.splice(index, 1);
    }
  }

  onLabelClick(label) {
    this.data.changeIdentityEventTrigger(label);
  }

  compareDate(date) {
    var currentDate = new Date().getTime();
    var reminderDate = new Date(date).getTime();
    if (currentDate > reminderDate) {
      return true;
    }
    else {
      return false;
    }
  }

  addLabelName(): void {
    if (this.newLabelName != undefined) {
      if (!this.myArray.some((data) => data.label == this.newLabelName)) {
        this.labelData.label = this.newLabelName;
        this.labelData.userId = this.userId;
        this.notesService.notesPostService('api/noteLabels', this.labelData)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
            this.getLabel();
            this.data.eventTrigger(true)
          });
      }
    }
  }
  archiveEventClicked(event) {
    if (event) {
      this.notesContent.isArchived = event;
      this.openSnackBar('Note archived', 'Undo');

    }
  }

  reminderEventClicked(event) {
    this.selectRemainderArray = event;
    this.selectedReminder = event[0];
  } 

  cancelRemainder() {
    this.selectRemainderArray = [];
    this.selectedReminder = "";
  }

  openSnackBar(message: string, action: string) {
   this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getLabel(): void {
    this.notesService.getLabelData('api/noteLabels/getNoteLabelList')
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.myArray = [];
        for (let index = 0; index < data['data'].details.length; index++) {
          if (data['data'].details[index].isDeleted == false) {
            this.myArray.push(data['data'].details[index])
          }
        }
      });
    // error => LoggerService.log('Error :' + error);
  }

  strike(index) {
    this.listArray[index].isDeleted = !this.listArray[index].isDeleted;
    this.listArray[index].isChecked = !this.listArray[index].isChecked;
  }


  @ViewChild('myListInput') myListInput: ElementRef;

  setFocus() {
    this.myListInput.nativeElement.focus();
  }

  removeList(index) {
    this.listArray.splice(index, 1);
  }

  onKey() {
    this.listArray.push({
      'listName': this.listName,
      'isChecked': false,
      'isDeleted': false
    });
    this.listName = '';
  }

  onCollaborator() {
    this.showCollaborator = 'collaborator'
  }
  @ViewChild(MatMenuTrigger) showList: MatMenuTrigger;
  userArray:any=[];
  collaboratorList:any=[];
  onCollaboratorKey() {
    if (this.personSearch != '') {
      this.showList.openMenu();
      this.show = true
      let search = {
        'searchWord' : this.personSearch
      }
      this.userService.userPostService('searchUserList',search)
      .subscribe(data => {
        
        this.userArray = data['data']['details'];
      });
    }
  }

  getEmail(receiverEmail){ 
    this.personSearch = receiverEmail;
  }

  addPerson(receiverEmail) {
    this.personSearch = '';
    this.show = !this.show;
    let index = this.userArray.findIndex(x => x.email== receiverEmail);
    this.collaboratorList.push(this.userArray[index]);
    this.userArray = [];
  }

  removePerson(receiverEmail) {
    let index = this.collaboratorList.findIndex(x => x.email== receiverEmail);
    if (index !== -1) {
      this.collaboratorList.splice(index, 1);
    }
  }

  onCancel() {
    this.showCollaborator = '';
    this.collaboratorList = [];
  }

  addCollaborator() {
    this.showCollaborator = '';
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
