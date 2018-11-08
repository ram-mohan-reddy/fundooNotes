import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import {DeleteLabelComponent} from '../delete-label/delete-label.component';
import { MatDialog} from '@angular/material';
@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.css']
})
export class MoreIconComponent implements OnInit {
  event: boolean = true
  @Output() eventClicked = new EventEmitter<boolean>();
  @Output() labelAdd = new EventEmitter<boolean>();
  @Input() notesDetails: any;
  @Input() componentName: any;
  constructor(private notesService : GetNotesService,private data: DataSharingService,public dialog: MatDialog) { }
  note : any;
  labelMenu: boolean = true;
  newLabelName: string;
  myArray = [];
  selectLabelArray = [];
  userId = localStorage.getItem('userId');
  labelData = {
    "label": "string",
    "isDeleted": false,
    "userId": "string"
  }
  ngOnInit() {  
    
  }
 
  deleteCard(value) {
    console.log(this.notesDetails); 
    this.note = {
      "isDeleted": value,
      "noteIdList":[this.notesDetails.id]
    }
    this.notesService.notesPostService('api/notes/trashNotes',this.note)
    .subscribe(data => {
      this.eventClicked.emit(this.event); 
      console.log(data);  
    });
    error => console.log('Error ', error);
  } 


  deleteLabelConfirmation(): void {
    const dialogRef = this.dialog.open(DeleteLabelComponent, {
      width: '500px',
      position: { top: '300px', left: '450px'},
      panelClass: 'myapp-no-padding-dialog',
      data: {componentName:"trash"}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log(this.notesDetails);  
        this.note = {
          "isDeleted": true,
          "noteIdList":[this.notesDetails.id]
        }
        this.notesService.notesPostService('api/notes/deleteForeverNotes',this.note)
        .subscribe(data => {
          this.eventClicked.emit(this.event); 
          console.log(data);  
        });
        error => console.log('Error ', error);
        
      }
    });
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
} 

onClick(value): void {
    this.notesService.notesPostService('api/notes/' + this.notesDetails.id + "/addLabelToNotes/" + value.id + '/add', {})
      .subscribe(data => {
        console.log(data);
        this.eventClicked.emit(this.event);
        this.labelAdd.emit(value)
      });
    error => console.log('Error ', error);

  } 

}

