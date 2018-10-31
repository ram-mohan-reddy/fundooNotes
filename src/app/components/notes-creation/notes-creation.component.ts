import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { GetNotesService } from '../../services/notes/get-notes.service';

@Component({
  selector: 'app-notes-creation',
  templateUrl: './notes-creation.component.html',
  styleUrls: ['./notes-creation.component.css']
})
export class NotesCreationComponent implements OnInit {
  constructor(private notesService:GetNotesService) { }
  public show: boolean = true;
  public checkList: boolean = false;
  message: string;
  token: string;
  colorCode;
  addMessage: boolean = false;
  myArray = [];
  selectLabelArray = [];
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
    "title": String,
    "description": String,
    "labelIdList": String,
    "checkList": String,
    "isPinned": Boolean,
    "color" : String
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
    // this.notesContent.labelIdList = JSON.stringify(this.selectLabelArray);
    // this.notesContent.labelIdList = JSON.stringify(this.selectLabelArray);

    this.colorCode = '#ffffff';
    console.log(this.notesContent);
    
    this.notesService.notesPostService('api/notes/addNotes',this.notesContent)
    .subscribe(data => {
      this.addMessage = true;
      this.notesAdded.emit(this.addMessage);
     this.notesContent.title= null;
     this.notesContent.description= null;
     this.selectLabelArray=[];
      console.log(data);  
    });
    error => console.log('Error ', error);
    this.selectLabelArray=[];
  }

  update() {
    console.log(this.notesContent.title);
    console.log(this.notesContent.description)

    this.saveNote()
    this.show = !this.show;
    
    
  }
  open(): void {
    this.show = !this.show;
  }

  onClick(value): void {
    console.log(value);
    if (!this.selectLabelArray.some((data) => data == value.label)) {
      this.selectLabelArray.push(value.label);
    }
    else {
      const index: number = this.selectLabelArray.indexOf(value.label);
      if (index !== -1) {
          this.selectLabelArray.splice(index, 1);
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

  addLabelName(): void {

    console.log(this.newLabelName);
    if (this.newLabelName != undefined) {
      this.labelData.label = this.newLabelName;
      this.labelData.userId = this.userId;
      this.notesService.notesPostService('api/noteLabels', this.labelData)
        .subscribe(data => {
          console.log(data);
          this.getLabel();
        });
      error => console.log('Error ', error);

    }
  }
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
}
