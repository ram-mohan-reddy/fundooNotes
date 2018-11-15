import { Component, OnInit, Output, EventEmitter,ElementRef, ViewChild } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-notes-creation',
  templateUrl: './notes-creation.component.html',
  styleUrls: ['./notes-creation.component.css']
})
export class NotesCreationComponent implements OnInit {
  constructor(private notesService:GetNotesService,private data: DataSharingService,
  public snackBar: MatSnackBar) { }
  listArray=[];
  listName:string;
  public show: boolean = true;
  public checkList: boolean = false;
  token: string;
  colorCode='';
  deleted:boolean=false;
  addMessage: boolean = false;
  myArray = [];
  selectLabelArray = [];
  selectRemainderArray=[];
  selectedReminder: string;
  labelArray = [];
  labelMenu: boolean = true; 
  newLabelName: string;
  status:string="open"
  userId = localStorage.getItem('userId');
  componentName={
    'id': undefined,
  }

  reminderEdit = {
    'id': undefined,
    'show' : false
  }

  user = {
    roles: []
  };
  labelData = {
    "label": "string",
    "isDeleted": false, 
    "userId": "string"
  }

  notesContentData:any;
  notesContent = {
    "file": File,
    "title": "",
    "description": "",
    "labelIdList": "",
    "checklist": "",
    "isArchived": false,
    "isPinned": false,
    "color" : "",
    "reminder" : ""
  }

  noteArchive = {
    "isArchived": false
  }
  @Output() notesAdded = new EventEmitter<boolean>();
  todayDate: Date = new Date();
  tomorrowDate = new Date();
  ngOnInit() {
this.getLabel();
this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
  }

  receiveMessage(event) {
    if (event) {
      this.saveNote();
      this.show = !this.show;
      this.checkList = !this.checkList; 
      this.labelArray=[];
      this.selectLabelArray=[];
    }
  } 

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  
  receiveColor(event) {
    if (event) {
     this.colorCode = event;
    }
  } 
  checkListArray=[];
  saveNote() {
    if (this.checkList == false) {
      this.notesContent.color = this.colorCode;
    if (this.selectLabelArray.length != 0) {
      this.notesContent.labelIdList =  JSON.stringify(this.labelArray);  
    }

    if (this.selectedReminder != undefined) {
      this.notesContent.reminder = this.selectedReminder;
    }
    this.labelArray=[];
    this.selectLabelArray=[];
    this.colorCode = '#ffffff';
    this.addNote(this.notesContent);
    }

    else {
      for(var i=0;i<this.listArray.length;i++){
        if(this.listArray[i].isChecked==true){
         this.status="close"
        }
        var listObject={
          'itemName' :this.listArray[i].listName,
          'status' :this.status,
          'isDeleted' :this.listArray[i].isDeleted
        }
        this.checkListArray.push(listObject);
        this.status="open"
      }
      this.notesContent.color = this.colorCode;
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
        "color" : this.notesContent.color,
        "reminder" : this.notesContent.reminder
      }   
          this.addNote(this.notesContentData); 
     }  
  }

addNote(notes) {
this.notesService.notesPostCreate('api/notes/addNotes',notes)
    .subscribe(data => {
      this.addMessage = true;
      this.notesAdded.emit(this.addMessage);
     this.notesContent.title= null;
     this.notesContent.description= null;
     this.notesContent.labelIdList = null;
     this.selectLabelArray=[];
     this.labelArray = [];  
    });
    error => console.log('Error ', error);
    this.selectLabelArray=[];
    this.labelArray=[];
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

  changeMenu(){
    if (this.labelMenu) { 
      this.labelMenu = !this.labelMenu
    }
    else {
      this.labelMenu = !this.labelMenu
    }
  } 

  cancelNoteLabel(labelId) {
    const index: number = this.selectLabelArray.indexOf(labelId);
    if (index !== -1) {
        this.selectLabelArray.splice(index, 1);
        this.labelArray.splice(index, 1);
    }  
  }

  addLabelName(): void { 
    if (this.newLabelName != undefined) {
      if (!this.myArray.some((data) => data.label == this.newLabelName)) {
        this.labelData.label = this.newLabelName;
      this.labelData.userId = this.userId;
      this.notesService.notesPostService('api/noteLabels', this.labelData)
        .subscribe(data => {
          this.getLabel(); 
          this.data.eventTrigger(true)
        });
      error => console.log('Error ', error);
      }
    }
  }
  archiveEventClicked(event){
    if (event) {
      this.notesContent.isArchived = event;
      this.openSnackBar('Note archived','Undo');
      
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
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getLabel(): void {
    this.notesService.getLabelData('api/noteLabels/getNoteLabelList')
      .subscribe(data => {
        this.myArray = [];
        for (let index = 0; index < data['data'].details.length; index++) {
          if (data['data'].details[index].isDeleted == false) {
            this.myArray.push(data['data'].details[index])
          }
        }
      }); 
      error => console.log('Error ', error);
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
      'listName' : this.listName,
      'isChecked' : false,
      'isDeleted' : false
    });
    this.listName = '';
  }

}
