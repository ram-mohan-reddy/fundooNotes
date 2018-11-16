import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import {LoggerService} from '../../core/services/loggerService/logger.service';
import { HttpService } from '../../core/services/httpService/http.service';

@Component({
  selector: 'app-notes-collection', 
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.scss'],

})
export class NotesCollectionComponent implements OnInit { 
  notesView:boolean=true;
  token: string = localStorage.getItem('token') 

  constructor(public dialog: MatDialog,private notesService : GetNotesService,
    public dataService: DataSharingService,public snackBar: MatSnackBar,private userService: HttpService) { 
      this.dataService.listEventEmitted.subscribe(message => { 
        if (message) {
          console.log(message);
          this.notesView = !this.notesView;
          this.notesEditRequest.emit(true);   
        } 
      })
      this.dataService.listEventEmitted.subscribe(message => {
        console.log(message);   
      })
    }
  @Input() notesListArray: any;
  @Input() searchText: any;
  @Input() componentName:any;
  @Output() notesEditRequest = new EventEmitter<boolean>();
  todayDate: Date = new Date();
  tomorrowDate = new Date();
  reminderEdit = false;
  
  ngOnInit(){
    LoggerService.log('Using logger service: ');
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
  }
 
  childEventClicked(event) {
    if (event) {
      this.notesEditRequest.emit(event);
    }
  }

  archiveEventClicked(event) {
    if (event) {
      this.openSnackBar('Note archived', 'Undo');
      this.notesEditRequest.emit(event);
    }
  }

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
  onLabelClick(label){
    this.dataService.changeIdentityEventTrigger(label);
  }

  deleteNoteLabel(labelId, noteId) {
    this.notesService.notesPostService('api/notes/' + noteId + "/addLabelToNotes/" + labelId + '/remove', {})
      .subscribe(data => {
        this.notesEditRequest.emit(true);
      });
    error => LoggerService.log('Error :' + error);
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      position: { top: '250px', left: '450px' },
      panelClass: 'myapp-no-padding-dialog',
      data: {
        notesData: notes,
        componentName: this.componentName
      }
    });
    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      console.log('on add');
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
      console.log(data);
      var body = ''
      this.notesService.notesPostService('api/notes/'+data.noteId+'/checklist/'+data.checklistId+'/remove',body)
    .subscribe(data => {
      console.log(data);
      this.notesEditRequest.emit(true);
    });
  error => console.log(error);
    }); 

    const sub4 = dialogRef.componentInstance.onCheckListUpdate.subscribe((data) => {
     console.log(data);
     if (data.newList.id != undefined) {
      this.notesService.notesPostService('api/notes/'+data.noteId+'/checklist/'+data.newList.id+'/update',data.newList)
    .subscribe(data => {
      console.log(data);
      this.notesEditRequest.emit(true);
    });
  error => console.log(error);
  }
     else {
       console.log('new list');
    this.notesService.notesPostService('api/notes/'+data.noteId+'/checklist/add',data.newList)
     .subscribe(data => {
       console.log(data);
       this.notesEditRequest.emit(true);
     });
   error => console.log(error);
     }
 
     
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != undefined) {
        if (result.description != '') {
          this.notesService.notesUpdateService('api/notes/updateNotes', result)
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
      .subscribe(data => {
        console.log(data);
        this.notesEditRequest.emit(true);
      });
    error => console.log(error);
  }

  updateChecklist(list,index) {
    console.log('in update');
    console.log(list.status);
    if (list.status == "open") {
      list.status = "close";
    }
    else {
      list.status = "open";
    }
   this.updateList(list,index);
  }
  updateList(list,note) {
    console.log(list);
    this.notesService.notesPostService('api/notes/'+note.id+'/checklist/'+list.id+'/update', list)
    .subscribe(data => {
      console.log(data);
      this.notesEditRequest.emit(true);
    });
  error => console.log(error);
  }

  pinNotes(note){
console.log(note.id);

    var noteDetails = {
      "isPined": true,
      "noteIdList":[note.id]
    }
    this.notesService.notesPostService('api/notes/pinUnpinNotes', noteDetails)
    .subscribe(data => {
      this.notesEditRequest.emit(true);
    });
  error => LoggerService.log('Error :' + error);

  }
}
