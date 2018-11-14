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
  onCheckListDelete = new EventEmitter<any>();
  onCheckListUpdate = new EventEmitter<any>();
  show:boolean=true;
  listName:string;
 listArray=[];  

  onReminderRemove = new EventEmitter<any>();
  labelListArray;
  reminderArray;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    backGroundColor : string = this.data.notesData.color;
  notesEditContent = {
    "title": this.data['notesData'].title, 
    "description": this.data['notesData'].description,
    "noteId": this.data['notesData'].id,
    "color" : this.backGroundColor,
  } 

 
  ngOnInit() {
    if (this.data['notesData'].noteCheckLists.length != 0) {
      this.show = false;
      this.listArray = this.data['notesData'].noteCheckLists;
    }
    this.labelListArray = this.data['notesData'].noteLabels;
    this.reminderArray = this.data['notesData'].reminder;
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

  reminderEventClicked(event) {
console.log(event);
this.reminderArray =[];
this.reminderArray.push(event)
  }
  
  deleteRemainder(id) {
    console.log(id);
    this.onReminderRemove.emit(id);
    this.reminderArray =[];
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

  
  removeList(index,list) {
    this.listArray.splice(index, 1); 
    console.log(list);
    this.onCheckListDelete.emit({
      'checklistId': list.id,
      'noteId' : this.data.notesData.id
    });
    
  }
  
  
  onKey(event: any) { 
    console.log(this.listName);
    
    this.listName = '';
    console.log(this.listName);
    
    console.log('key pressed'); 
    console.log(event.keyCode);
    if (event.keyCode >=48 && event.keyCode <=57) {
      this.listArray.push({
        'itemName' : event.key,
        'status' : "open",
        'isDeleted' : false
      });
    }

    else if (event.keyCode >=65 && event.keyCode <=90) {
      this.listArray.push({
        'itemName' : event.key,
        'status' : "open",
        'isDeleted' : false
      });
    }

    else if (event.keyCode >=96 && event.keyCode <=105) {
      this.listArray.push({
        'itemName' : event.key,
        'status' : "open",
        'isDeleted' : false
      });
    }
    
    else if (event.keyCode == 13) {
      this.listArray.push({
        'itemName' : " ",
        'status' : "open",
        'isDeleted' : false
      });
    }
  }

  updateList(){

   var notesEditContent = {
      "title": this.data['notesData'].title, 
      "checkList": this.listArray,
      "id": this.data['notesData'].id,
      "color" : this.backGroundColor,
    } 
    this.onCheckListUpdate.emit(notesEditContent);
   
  }

}
