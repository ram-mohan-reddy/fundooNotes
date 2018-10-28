import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component'
import { GetNotesService } from '../../services/notes/get-notes.service';
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {
  
  constructor(public dialog: MatDialog,private notesService : GetNotesService) { }
  @Input() notesListArray: any;
  @Input() firstArray;
  @Input() secondArray;
  @Input() thirdArray;

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
    
    openDialog(notes): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '600px',
        position: { top: '250px', left: '450px'},
        panelClass: 'myapp-no-padding-dialog',
        data: {notesData : notes}
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
