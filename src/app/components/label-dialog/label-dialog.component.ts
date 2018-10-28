import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.css']
})
export class LabelDialogComponent implements OnInit {
  changeText: boolean = false;
  constructor( public dialogRef: MatDialogRef<LabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    labelName : string;

  ngOnInit() {
  }

  deleteLabel(){
    console.log('delete activated');
    
  }

}
