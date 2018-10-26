import { Component, OnInit,Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GetNotesService } from '../../services/notes/get-notes.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private notesService : GetNotesService) {}

  notesEditContent = {
    "title": this.data['notesData'].title,
    "description": this.data['notesData'].description,
    "noteId": this.data['notesData'].id
  }
  ngOnInit() {
    // console.log(this.data['notesData'].id)
  }

}
