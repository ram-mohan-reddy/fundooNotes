import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { GetNotesService } from '../../services/notes/get-notes.service';
@Component({
  selector: 'app-notes-creation',
  templateUrl: './notes-creation.component.html',
  styleUrls: ['./notes-creation.component.css']
})
export class NotesCreationComponent implements OnInit {
  constructor(public dialog: MatDialog,private notesService:GetNotesService) { }
  public show: boolean = true;
  message: string;
  token: string;
  addMessage: boolean = false;
  notesContent = {
    "file": File,
    "title": String,
    "description": String,
    "labelIdList": String,
    "checkList": String,
    "isPinned": Boolean
  }
  @Output() notesAdded = new EventEmitter<boolean>();

  ngOnInit() {

  }

  receiveMessage(event) {
    if (event) {
      this.saveNote()
      this.show = !this.show;
    }
  } 

  saveNote() {
    this.notesService.saveNotes(this.notesContent)
    .subscribe(data => {
      this.addMessage = true;
      this.notesAdded.emit(this.addMessage);
      console.log(data);  
    });
    error => console.log('Error ', error);
  }
  update() {
    this.show = !this.show;
    console.log(this.notesContent.title);
    console.log(this.notesContent.description)
  }

 
  openDialog(): void {
    this.show = !this.show
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      position: { top: '100px', left: '450px' },

      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.show = !this.show
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  open(): void {
    this.show = !this.show;
  }

}
