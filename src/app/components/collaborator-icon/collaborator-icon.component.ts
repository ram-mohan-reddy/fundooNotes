import { Component, OnInit } from '@angular/core';
import {CollaboratorDialogComponent} from '../collaborator-dialog/collaborator-dialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-collaborator-icon',
  templateUrl: './collaborator-icon.component.html',
  styleUrls: ['./collaborator-icon.component.scss']
})
export class CollaboratorIconComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() { 
  }

  onCollaborator(): void {
    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      width: '600px',
      panelClass: 'myapp-no-padding-dialog',
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
}
