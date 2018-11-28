import { Component, OnInit,Input,Output, EventEmitter, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import {DeleteLabelComponent} from '../delete-label/delete-label.component';
import { MatDialog} from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.scss']
})
export class MoreIconComponent implements OnInit, OnDestroy{
  event: boolean = true
  @Output() eventClicked = new EventEmitter<boolean>();
  @Output() labelAdd = new EventEmitter<boolean>();
  @Input() notesDetails: any;
  @Input() componentName: any;
  // list = ['frontier']
  constructor(private notesService : GetNotesService,private data: DataSharingService,
    public dialog: MatDialog,private route: Router) { }
  note : any;
  labelMenu: boolean = true;
  newLabelName: string;
  myArray = [];
  selectLabelArray = [];
  checkedArray= [];
  userId = localStorage.getItem('userId');
  labelData = {
    "label": "string",
    "isDeleted": false,
    "userId": "string"
  }
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit() {   
    
  }

  isSelected(value): boolean {
    if (!this.notesDetails.noteLabels.some((data) => data.label == value.label)) {
      return false
    }
    else {
      return true
    }
  }


  deleteCard(value) {
    this.note = {
      "isDeleted": value,
      "noteIdList":[this.notesDetails.id]
    }
    this.notesService.notesPostService('api/notes/trashNotes',this.note)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
      this.eventClicked.emit(this.event);   
    });
  } 


  deleteLabelConfirmation(): void {
    const dialogRef = this.dialog.open(DeleteLabelComponent, {
      width: '500px',
      position: { top: '300px', left: '450px'},
      panelClass: 'myapp-no-padding-dialog',
      data: {componentName:"trash"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {  
        this.note = {
          "isDeleted": true,
          "noteIdList":[this.notesDetails.id]
        }
        this.notesService.notesPostService('api/notes/deleteForeverNotes',this.note)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.eventClicked.emit(this.event);   
        });
      }
    });
} 

  changeMenu(){
    if (this.labelMenu) { 
      this.labelMenu = false
    }
    else {
      this.labelMenu = true
    }
  } 

  addLabelName(): void {
    if (this.newLabelName != undefined) {
      if (!this.myArray.some((data) => data.label == this.newLabelName)) {
      this.labelData.label = this.newLabelName;
      this.labelData.userId = this.userId;
      this.notesService.notesPostService('api/noteLabels', this.labelData)
      .pipe(takeUntil(this.destroy$))  
      .subscribe(data => {
          this.getLabel();
          this.data.eventTrigger(true)
        });
      }
    } 
  }

  getLabel(): void {
    this.notesService.getLabelData('api/noteLabels/getNoteLabelList')
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
        this.myArray = [];
        for (let index = 0; index < data['data'].details.length; index++) {
          if (data['data'].details[index].isDeleted == false) {
            this.myArray.push(data['data'].details[index]);
          }
        }      
      });
} 

onClick(value): void {

  if (!this.notesDetails.noteLabels.some((data) => data.label == value.label)) {
    this.notesService.notesPostService('api/notes/' + this.notesDetails.id + "/addLabelToNotes/" + value.id + '/add', {})
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      setTimeout(()=>{ 
        this.eventClicked.emit(this.event);
       }, 1000)
       this.labelAdd.emit(value)
    });
  }
  else {
    this.notesService.notesPostService('api/notes/' + this.notesDetails.id + "/addLabelToNotes/" + value.id + '/remove', {})
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      setTimeout(()=>{ 
        this.eventClicked.emit(this.event);
       }, 1000)
       this.labelAdd.emit(value)
    });
  }
  }

  askQuestion() {
    this.route.navigate(['home/notes/'+this.notesDetails.id+'/question'])
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 

}

