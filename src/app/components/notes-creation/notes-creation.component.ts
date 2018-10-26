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
  message: string;
  token: string;
  colorCode;
  addMessage: boolean = false;
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

  }

  receiveMessage(event) {
    if (event) {
      console.log(this.colorCode);
      console.log(this.notesContent);  
      this.saveNote()
      this.show = !this.show;
    }
  } 

  receiveColor(event) {
    if (event) {
     this.colorCode = event;
     console.log(this.colorCode);
    }
  } 
  

  saveNote() {
    this.notesContent.color = this.colorCode
    this.colorCode = '#ffffff';
    console.log(this.notesContent);
    
    this.notesService.notesPostService('api/notes/addNotes',this.notesContent)
    .subscribe(data => {
      this.addMessage = true;
      this.notesAdded.emit(this.addMessage);
     this.notesContent.title= null;
     this.notesContent.description= null;
      console.log(data);  
    });
    error => console.log('Error ', error);
  }

  // update() {
  //   this.show = !this.show;
  //   console.log(this.notesContent.title);
  //   console.log(this.notesContent.description)
  // }

 
  
  open(): void {
    this.show = !this.show;
  }

}
