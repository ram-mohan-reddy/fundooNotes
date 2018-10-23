import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component'
import { HttpService } from '../../services/http.service';
@Component({
  selector: 'app-notes-creation',
  templateUrl: './notes-creation.component.html',
  styleUrls: ['./notes-creation.component.css']
})
export class NotesCreationComponent implements OnInit {

  constructor(public dialog: MatDialog,private userService: HttpService) { }
  public show:boolean = true;
  message:string;
  token: string;
  notesContent = {

    "file" : File,
    "title" : String,
    "description" : String,
    "labelIdList" : String,
    "checkList" : String,
    "isPinned" : Boolean
  }

  receiveMessage(event) {
    if (event) {
      this.saveNote();
      this.show = !this.show;
     
    }
  }
  saveNote() {
    this.token = localStorage.getItem('token')
    this.userService.saveNote('api/notes/addNotes',this.notesContent,this.token)
    .subscribe(data => {
      console.log(data); 
      error => console.log('Error ', error);       
    });

  }
  update() {
    this.show = !this.show;
    console.log(this.notesContent.title);
    console.log(this.notesContent.description)
  }

  ngOnInit() {  
  }
  openDialog(): void {
    this.show = !this.show
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        position: {top: '100px',left:'450px'},
        
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
