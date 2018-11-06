import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'] 
})
export class DialogComponent implements OnInit {
  onAdd = new EventEmitter<boolean>();
  onDelete = new EventEmitter<any>();
  labelListArray;
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
    this.labelListArray = this.data['notesData'].noteLabels;
  }

  colorEventClicked(event) {
    console.log(event);
    this.backGroundColor = event; 
  }
 
  childEventClicked(event) { 
    if (!this.labelListArray.some((data) => data.id == event.id)) {
      this.labelListArray.push(event);
      this.onAdd.emit(true);
    }
    else {
      const index: number = this.labelListArray.indexOf(event);
      if (index !== -1) {
          this.labelListArray.splice(index, 1);   
      }  
    } 
  }
  eventClicked(event) { 
      this.onAdd.emit(event);
      this.dialogRef.close();
  }
  removeLabel(label){
console.log(label);
const index: number = this.labelListArray.indexOf(label);
if (index !== -1) {
    this.labelListArray.splice(index, 1);
}  
var labelDetails = {
  'labelId': label.id,
  'noteId' : this.data.notesData.id
}

this.onDelete.emit(labelDetails);
  }
}
