/************************************************************************************************
*  Execution       :   1. default node         cmd> notes.ts 
*        
*  Purpose         : To display small card & hiddencards & change color when clicked 
* 
*  Description    
* 
*  @file           : notes.ts
*  @overview       : To display small card & hiddencards & change color when clicked
*  @module         : notes.ts - This is optional if expeclictly its an npm or local package
*  @author         : ram-mohan-reddy <ram.mohan10595@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import {LoggerService} from '../../core/services/loggerService/logger.service';
import { Notes } from '../../core/models/notes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  /**A string value which represents the component on browser at execution time */
  selector: 'app-notes',
  /**External templating process to define html tags in component */
  templateUrl: './notes.component.html',
  /**It is used to provide style of components */
  styleUrls: ['./notes.component.scss'] 
})
/**To use components in other modules , we have to export them */
export class NotesComponent implements OnInit, OnDestroy{
  note: Notes[]=[];
  list;
  totalNotes: any = [];
  pinedNotes: any = [];
  spinner:boolean = false;
  separateOthers : string = 'Others'
  separatePinned : string = 'pinned';
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService : GetNotesService) { }
    /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
  ngOnInit() { 

    this.getNotes();
  }
  notesAddRequest(event) {
    if (event) {
      this.getNotes();
    }
  }

  getNotes() {
    this.spinner = true;
    this.notesService.getNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: Notes[]) => {
      this.spinner= false;
      this.note = data['data'].data;
      this.notesCollection(this.note)
    });
    // error =>  LoggerService.log('Error :' + error);
  }
  notesCollection(data) {
    this.list = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].isDeleted == false && data[index].isArchived == false && data[index].isPined == false) {
        this.list.push(data[index])
      }
    }
    this.totalNotes = this.list.reverse();
    LoggerService.log('Notes : ',this.totalNotes );
    this.list = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].isDeleted == false && data[index].isArchived == false && data[index].isPined == true) {
        this.list.push(data[index])
      }
    }
    this.pinedNotes = this.list.reverse();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 
}
