import { Component, OnInit,Inject,EventEmitter,ElementRef, ViewChild } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'] 
})
export class DialogComponent implements OnInit {
  onAdd = new EventEmitter<boolean>();
  onDelete = new EventEmitter<any>();
  onCheckListDelete = new EventEmitter<any>();
  onCheckListUpdate = new EventEmitter<any>();
  show: boolean = true;
  listName: string;
  listArray = [];  

  onReminderRemove = new EventEmitter<any>();
  labelListArray;
  reminderArray;
  todayDate: Date = new Date();
  tomorrowDate = new Date();
  reminderEdit = false;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataSharingService) {}
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
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
  }

  colorEventClicked(event) { 
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
    if (event) {
      this.reminderArray = [];
      this.reminderArray.push(event);
      this.onAdd.emit(true);
    }
  }

  onLabelClick(label){
    this.dataService.changeIdentityEventTrigger(label);
    this.dialogRef.close();
  }
  
  deleteRemainder(id) {
    this.onReminderRemove.emit(id);
    this.reminderArray =[];
  }

  removeLabel(label){
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
    this.onCheckListDelete.emit({
      'checklistId': list.id,
      'noteId' : this.data.notesData.id
    });
    
  }
  
  
  onKey() { 
    this.listArray.push({
      'itemName' : this.listName,
      'status' : "open",
      'isDeleted' : false
    });
    this.onEnter({
      'itemName' : this.listName,
      'status' : "open",
      'isDeleted' : false
    })

    this.listName = '';
  } 
  onEnter(list) {
    this.onCheckListUpdate.emit({
      'noteId': this.data['notesData'].id,
      'newList': list
    });
    
  }

  updateChecklist(list) {
    if (list.status == "open") {
      list.status = "close";
    }
    else {
      list.status = "open";
    }
    this.onEnter(list);
  }

  @ViewChild('myListInput') myListInput: ElementRef; 
  
  setFocus() { 
    this.myListInput.nativeElement.focus(); 
  } 

  compareDate(date) {
    var currentDate = new Date().getTime();
    var reminderDate = new Date(date).getTime();
    if (currentDate > reminderDate) {
      return true;
    }
    else {
      return false;
    }
  }
}
