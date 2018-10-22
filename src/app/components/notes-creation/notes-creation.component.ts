import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component'
@Component({
  selector: 'app-notes-creation',
  templateUrl: './notes-creation.component.html',
  styleUrls: ['./notes-creation.component.css']
})
export class NotesCreationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  public show:boolean = true;
  message:string;

  receiveMessage(event) {
    if (event) {
      this.show = !this.show
    }
   
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
      this.show = !this.show
    }
}
