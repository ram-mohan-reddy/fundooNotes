import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-label',
  templateUrl: './delete-label.component.html',
  styleUrls: ['./delete-label.component.scss']
})
export class DeleteLabelComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { } 

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
