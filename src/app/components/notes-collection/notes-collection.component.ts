/************************************************************************************************
*  Execution       :   1. default node         cmd> notes-collection.ts 
*        
*  Purpose         : To add the cards down & display the collection of cards after the click of close button
* 
*  Description    
* 
*  @file           : notes-collection.ts
*  @overview       : To add the cards down & display the collection of cards after the click of close button
*  @module         : notes-collection.ts - This is optional if expeclictly it's an npm or local package
*  @author         : ram-mohan-reddy <ram.mohan10595@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
/**component has imports , decorator & class */
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { HttpService } from '../../core/services/httpService/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
/**A componenet can be reused throughout the application & even in other applications */
@Component({
  /**A string value which represents the component on browser at execution time */
  selector: 'app-notes-collection',
  /**External templating process to define html tags in component */
  templateUrl: './notes-collection.component.html',
  /**It is used to provide style of components */
  styleUrls: ['./notes-collection.component.scss'],

})
/**To use components in other modules , we have to export them */

export class NotesCollectionComponent implements OnInit, OnDestroy {
  notesView: boolean = true;
  token: string = localStorage.getItem('token')
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog, private notesService: GetNotesService,
    public dataService: DataSharingService, public snackBar: MatSnackBar,
    private userService: HttpService) {
    this.dataService.listEventEmitted.subscribe(message => {
      if (message) {
        this.notesView = !this.notesView;
        this.notesEditRequest.emit(true);
      }
    })
    this.dataService.eventEmitted.subscribe(message => {
      this.notesEditRequest.emit(true);
    })
  }
/**Input and Output are two decorators in Angular responsible for communication between two components*/
@Input() notesListArray: any;
@Input() separate: any;
@Input() searchText: any;
@Input() componentName: any;
/**To be able to use our output we need to import & bind a new instance of the event emitter to it */
@Output() notesEditRequest = new EventEmitter<boolean>();
  todayDate: Date = new Date();
  tomorrowDate = new Date();
  reminderEdit = false;
  /**it is a interface */
  /**OnInit is a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive. */
ngOnInit() {
    LoggerService.log('Using logger service: ');
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
  }
/**callback will be invoked &data associated with the event will be given to us via $event property */
childEventClicked(event) {
    if (event) {
      this.notesEditRequest.emit(event);
    }
  }
/**callback will be invoked & data associated with the event will be given to us via $event property */
archiveEventClicked(event) {
    if (event) {
      this.openSnackBar('Note archived', 'Undo');
      this.notesEditRequest.emit(event);
    }
  }
/**callback will be invoked &data associated with the event will be given to us via $event property */
unArchiveEventClicked(event) {
    if (event) {
      this.openSnackBar('Note unarchived', 'Undo');
      this.notesEditRequest.emit(event);
    }
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
  onLabelClick(label) {
    this.dataService.changeIdentityEventTrigger(label);
  }

  deleteNoteLabel(labelId, noteId) {
    this.notesService.notesPostService('api/notes/' + noteId + "/addLabelToNotes/" + labelId + '/remove', {})
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
        this.notesEditRequest.emit(true);
      });
    error => LoggerService.log('Error :' + error);
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      panelClass: 'myapp-no-padding-dialog',
      data: {
        notesData: notes,
        componentName: this.componentName
      }
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      if (data) {
        this.notesEditRequest.emit(true);
      }
    });

    const sub1 = dialogRef.componentInstance.onDelete.subscribe((data) => {
      this.deleteNoteLabel(data.labelId, data.noteId)
    });

    const sub2 = dialogRef.componentInstance.onReminderRemove.subscribe((data) => {
      this.deleteRemainder(data);
    });
    const sub3 = dialogRef.componentInstance.onCheckListDelete.subscribe((data) => {
      var body = ''
      this.notesService.notesPostService('api/notes/' + data.noteId + '/checklist/' + data.checklistId + '/remove', body)
      .pipe(takeUntil(this.destroy$))  
      .subscribe(data => {
          this.notesEditRequest.emit(true);
        });
      error => LoggerService.log('Error :' + error);
    });

    const sub4 = dialogRef.componentInstance.onCheckListUpdate.subscribe((data) => {
      if (data.newList.id != undefined) {
        this.notesService.notesPostService('api/notes/' + data.noteId + '/checklist/' + data.newList.id + '/update', data.newList)
        .pipe(takeUntil(this.destroy$))  
        .subscribe(data => {
            this.notesEditRequest.emit(true);
          });
        error => LoggerService.log('Error :' + error);
      }
      else {
        this.notesService.notesPostService('api/notes/' + data.noteId + '/checklist/add', data.newList)
        .pipe(takeUntil(this.destroy$))  
        .subscribe(data => {
            this.notesEditRequest.emit(true);
          });
        error => LoggerService.log('Error :' + error);
      }


    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.description != '') {
          this.notesService.notesUpdateService('api/notes/updateNotes', result)
          .pipe(takeUntil(this.destroy$))  
          .subscribe(data => {
              this.notesEditRequest.emit(true);
            });
          error => LoggerService.log('Error :' + error);
        }
      }
    });
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

  deleteRemainder(noteId) {
    var note = {
      "noteIdList": [noteId]
    }
    this.notesService.notesPostService('api/notes/removeReminderNotes', note)
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
        this.notesEditRequest.emit(true);
      });
    error => LoggerService.log('Error :' + error);
  }

  updateChecklist(list, index) {
    if (list.status == "open") {
      list.status = "close";
    }
    else {
      list.status = "open";
    }
    this.updateList(list, index);
  }
  updateList(list, note) {
    this.notesService.notesPostService('api/notes/' + note.id + '/checklist/' + list.id + '/update', list)
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
        this.notesEditRequest.emit(true);
      });
    error => LoggerService.log('Error :' + error);
  }

  pinNotes(note) {
    var noteDetails = {
      "isPined": true,
      "noteIdList": [note.id]
    }
    this.notesService.notesPostService('api/notes/pinUnpinNotes', noteDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.notesEditRequest.emit(true);
      }); 
    error => LoggerService.log('Error :' + error);
  }

  unPinNotes(note) {
    var noteDetails = {
      "isPined": false,
      "noteIdList": [note.id]
    }
    this.notesService.notesPostService('api/notes/pinUnpinNotes', noteDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.notesEditRequest.emit(true);
      }); 
    error => LoggerService.log('Error :' + error);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
