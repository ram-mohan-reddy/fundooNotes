import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { HttpService } from '../../core/services/httpService/http.service';

@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.scss'],

})
export class NotesCollectionComponent implements OnInit {
  notesView: boolean = true;
  token: string = localStorage.getItem('token')

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
  @Input() notesListArray: any;
  @Input() separate: any;
  @Input() searchText: any;
  @Input() componentName: any;
  @Output() notesEditRequest = new EventEmitter<boolean>();
  todayDate: Date = new Date();
  tomorrowDate = new Date();
  reminderEdit = false;

  ngOnInit() {
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
  onLabelClick(label) {
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
        .subscribe(data => {
          this.notesEditRequest.emit(true);
        });
      error => LoggerService.log('Error :' + error);
    });

    const sub4 = dialogRef.componentInstance.onCheckListUpdate.subscribe((data) => {
      if (data.newList.id != undefined) {
        this.notesService.notesPostService('api/notes/' + data.noteId + '/checklist/' + data.newList.id + '/update', data.newList)
          .subscribe(data => {
            this.notesEditRequest.emit(true);
          });
        error => LoggerService.log('Error :' + error);
      }
      else {
        this.notesService.notesPostService('api/notes/' + data.noteId + '/checklist/add', data.newList)
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
      .subscribe(data => {
        this.notesEditRequest.emit(true);
      });
    error => LoggerService.log('Error :' + error);
  }
}
