import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../services/notes/get-notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  totalNotes = [];
  token: string;
  list;
  note;
  componentName = 'trash'; 
  constructor(private notesService : GetNotesService) { }

  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.notesService.getNotes()
      .subscribe(data => {
        console.log(data);
        this.list = [];
        for (let index = 0; index < data['data'].data.length; index++) {
          if (data['data'].data[index].isDeleted == true) {
            this.list.push(data['data'].data[index])
          }
        }
        this.totalNotes = this.list.reverse();
      });
    error => console.log('Error ', error);
  }

  notesDeleteRequest(event) {
    if (event) {
      console.log(event);
      this.getNotes();
    }
  }
}
