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
  checkBoxArray=[];
  public show: boolean = true;
  public checkList: boolean = false;
  token: string;
  colorCode='';
  addMessage: boolean = false;
  myArray = [];
  selectLabelArray = [];
  labelArray = [];
  labelMenu: boolean = true; 
  newLabelName: string;
  userId = localStorage.getItem('userId');
  user = {
    roles: []
  };
  labelData = {
    "label": "string",
    "isDeleted": false, 
    "userId": "string"
  }

  notesContent = {
    "file": File,
    "title": "",
    "description": "",
    "labelIdList": "",
    "checkList": "",
    "isArchived": false,
    "isPinned": false,
    "color" : ""
  }

  noteArchive = {
    "isArchived": false
  }
  @Output() notesAdded = new EventEmitter<boolean>();

  ngOnInit() {
this.getLabel();
  }

  receiveMessage(event) {
    if (event) {
      console.log(this.colorCode);
      console.log(this.notesContent);  
      this.saveNote()
      this.show = !this.show;
      this.checkList = !this.checkList; 
      this.labelArray=[];
      this.selectLabelArray=[];
    }
  } 

  receiveColor(event) {
    if (event) {
     this.colorCode = event;
     console.log(this.colorCode);
    }
  } 

  saveNote() {
    this.notesContent.color = this.colorCode;
    if (this.selectLabelArray.length != 0) {
      // this.notesContent.labelIdList = JSON.stringify(this.labelArray);     
      this.notesContent.labelIdList =  JSON.stringify(this.labelArray);  
    }
    this.labelArray=[];
    this.selectLabelArray=[];
    this.colorCode = '#ffffff';
    console.log(this.notesContent);
    this.notesService.notesPostCreate('api/notes/addNotes',this.notesContent)
    .subscribe(data => {
      this.addMessage = true;
      this.notesAdded.emit(this.addMessage);
     this.notesContent.title= null;
     this.notesContent.description= null;
     this.notesContent.labelIdList = null;
     this.selectLabelArray=[];
     this.labelArray = [];
      console.log(data);  
    });
    error => console.log('Error ', error);
    this.selectLabelArray=[];
    this.labelArray=[];
  }

  update() {
    console.log(this.notesContent.title);
    console.log(this.notesContent.description)

    this.saveNote()
    this.show = !this.show;
    
    
  }
  open(): void {
    this.show = !this.show;
    this.checkList = false;
  }

  onClick(value): void {
    console.log(value);
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
    console.log(this.labelMenu);
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
    console.log(this.newLabelName);
    if (this.newLabelName != undefined) {
      if (!this.myArray.some((data) => data.label == this.newLabelName)) {
        this.labelData.label = this.newLabelName;
      this.labelData.userId = this.userId;
      this.notesService.notesPostService('api/noteLabels', this.labelData)
        .subscribe(data => {
          console.log(data);
          this.getLabel(); 
          this.data.eventTrigger(true)
        });
      error => console.log('Error ', error);
      }
    }
  }
  archiveEventClicked(event){

    console.log(event);

    if (event) {
      this.notesContent.isArchived = event;
      this.openSnackBar('Note archived','Undo');
      
    }
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 5000,
    });

    // snackBarRef.onAction().subscribe(()=> this.doUnArchive());
  }

  // doUnArchive() {

  //   this.notesContent.isArchived = false ;
  // }


  getLabel(): void {
    this.notesService.getLabelData('api/noteLabels/getNoteLabelList')
      .subscribe(data => {
        console.log("get  :", data);
        this.myArray = [];
        for (let index = 0; index < data['data'].details.length; index++) {
          if (data['data'].details[index].isDeleted == false) {
            this.myArray.push(data['data'].details[index])
          }
        }
      });
      error => console.log('Error ', error);
  }
  // @ViewChild('myTextField') myInput: ElementRef; 
  labelName : string;
  onKey(event: any) { 
    console.log('key pressed'); 
    console.log(event.key);
    this.checkBoxArray.push(event.key);
    console.log(this.labelName);
    
    this.labelName= null
    // this.myInput.nativeElement.focus();
  }

}
