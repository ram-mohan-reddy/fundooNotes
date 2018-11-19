import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
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
        this.list = [];
        for (let index = 0; index < data['data'].data.length; index++) {
          if (data['data'].data[index].isDeleted == true) {
            this.list.push(data['data'].data[index])
          }
        }
        this.totalNotes = this.list.reverse();
      });
    error => LoggerService.log('Error :' + error);
  }

  notesDeleteRequest(event) {
    if (event) {
      this.getNotes();
    }
  }
}
