import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    backGroundColor : string = this.data.notesData.color;
  notesEditContent = {
    "title": this.data['notesData'].title, 
    "description": this.data['notesData'].description,
    "noteId": this.data['notesData'].id,
    "color" : this.backGroundColor
  } 

 
  ngOnInit() {
    // console.log(this.data['notesData'].id)
  }

  childEventClicked(event) {
    console.log(event);

    this.backGroundColor = event;
   
  }
}
