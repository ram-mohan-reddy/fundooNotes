import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../services/notes/get-notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  token: string;
  list;
  totalNotes: any = [];

  constructor(private notesService : GetNotesService) { }

  ngOnInit() { 
    this.notesService.getNotes()
    .subscribe(data => {
      console.log(data);
      this.notesCollection(data) 
    });
    error => console.log('Error ', error);
  }

  notesAddRequest(event) {
    if (event) {
      console.log(event);
      this.notesService.getNotes().subscribe(data => {
        console.log(data);
         this.notesCollection(data)
      });
      error => console.log('Error ', error);
    }
  }

  notesCollection(data) {
    this.list = [];
        for (let index = 0; index < data['data'].data.length; index++) {
          if (data['data'].data[index].isDeleted == false) {
            this.list.push(data['data'].data[index])
          }
        }
        this.totalNotes = this.list.reverse(); 
  }
}
