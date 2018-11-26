import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {CollaboratorDialogComponent} from '../collaborator-dialog/collaborator-dialog.component';
import { MatDialog } from '@angular/material';
import { Notes } from '../../core/models/notes';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-collaborator-icon',
  templateUrl: './collaborator-icon.component.html',
  styleUrls: ['./collaborator-icon.component.scss']
})
export class CollaboratorIconComponent implements OnInit, OnDestroy {
  @Input() notesDetails:Notes;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public dialog: MatDialog,private notesService: GetNotesService) { }

  ngOnInit() {  
  } 
 
  onCollaborator(): void {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      width: '600px',
      panelClass: 'myapp-no-padding-dialog',
      data: { note:this.notesDetails }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
     if (result != undefined) {
       for (let index = 0; index < result.length; index++) {
        console.log(result[index]);
        this.notesService.notesPostService('api/notes/'+this.notesDetails.id+'/AddcollaboratorsNotes',result[index])
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          console.log(data);
        });
       } 
     }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 
}
