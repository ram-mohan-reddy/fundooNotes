import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { GetNotesService } from '../../services/notes/get-notes.service';
import { DataSharingService } from '../../services/data-sharing.service';
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {
  
  notesView:boolean=true;

  constructor(public dialog: MatDialog,private notesService : GetNotesService,
    public dataService: DataSharingService,public snackBar: MatSnackBar) { 
      this.dataService.eventEmitted.subscribe(message => {
        console.log(message);  
        if (message) {
          this.notesView = !this.notesView;
          this.notesEditRequest.emit(true);   
        } 
      })
    }
  @Input() notesListArray: any;
  @Input() searchText: any;
  @Input() componentName:any;
  @Output() notesEditRequest = new EventEmitter<boolean>();
  ngOnInit(){
    // this.notesList();  
    console.log(this.notesListArray.length)
  }
 
  childEventClicked(event) {
    console.log(event);
    console.log('in notes collection');
    if (event) {
      this.notesEditRequest.emit(event);   
    }
   
    }

    archiveEventClicked(event) {
      console.log(event);
      console.log('in notes collection');
      if (event) {
        this.openSnackBar('Note archived','Undo');
        this.notesEditRequest.emit(event); 
      }
      }

      unArchiveEventClicked(event) {
        console.log(event);
        console.log('in notes collection');
        if (event) {
          this.openSnackBar('Note unarchived','Undo');
          this.notesEditRequest.emit(event); 
        }
        }

      openSnackBar(message: string, action: string) {
        let snackBarRef = this.snackBar.open(message, action, {
          duration: 1000,
        });
      }
 
  deleteNoteLabel(labelId, noteId) {
    console.log('delete label');
    console.log(labelId);
    console.log(noteId);
    this.notesService.notesPostService('api/notes/' + noteId + "/addLabelToNotes/" + labelId + '/remove', {})
      .subscribe(data => {
        console.log(data);
        this.notesEditRequest.emit(true);
      });
    error => console.log('Error ', error);
  }
    openDialog(notes): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        position: { top: '250px', left: '450px'},
        panelClass: 'myapp-no-padding-dialog',
        data: {notesData : notes,
          componentName : this.componentName}
      });
      const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
    console.log(data);
    this.notesEditRequest.emit(true); 
      });

      const sub1 = dialogRef.componentInstance.onDelete.subscribe((data) => {
        console.log(data);
        this.deleteNoteLabel(data.labelId,data.noteId) 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          console.log(result);

          this.notesService.notesUpdateService('api/notes/updateNotes',result)
            .subscribe(data => {
              console.log(data);
              this.notesEditRequest.emit(true);
            });
          error => console.log('Error ', error); 
        }       
        console.log('The dialog was closed');
      });
    }
  
}
