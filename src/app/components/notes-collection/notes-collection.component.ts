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
  styleUrls: ['./notes-collection.component.css'],

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

  ngOnInit(){
    LoggerService.log('Using logger service: ');
    console.log(this.todayDate);
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
    console.log(this.tomorrowDate); 
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
      this.notesEditRequest.emit(true);
    });

    const sub1 = dialogRef.componentInstance.onDelete.subscribe((data) => {
      this.deleteNoteLabel(data.labelId, data.noteId)
    });

    const sub2 = dialogRef.componentInstance.onReminderRemove.subscribe((data) => {
      this.deleteRemainder(data);
    });
    const sub3 = dialogRef.componentInstance.onCheckListDelete.subscribe((data) => {
      this.userService.userLogout('api/notes/'+data.noteId+'/checklist/'+data.checklistId+'/remove',this.token)
    .subscribe(data => {
      console.log(data);
      this.notesEditRequest.emit(true);
    });
  error => console.log(error);
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.notesService.notesUpdateService('api/notes/updateNotes', result)
          .subscribe(data => {
            this.notesEditRequest.emit(true);
          });
        error => LoggerService.log('Error :' + error);
      }
    });
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
}
