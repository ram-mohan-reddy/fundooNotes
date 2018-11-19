import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  totalNotes = [];
  token: string;
  list;
  note;
  constructor(private notesService : GetNotesService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() { 
    this.notesService.getNotes()
      .subscribe(data => {
        this.list = [];
        for (let index = 0; index < data['data'].data.length; index++) {
          if (data['data'].data[index].isArchived == true) {
            this.list.push(data['data'].data[index])
          }
        }
        this.totalNotes = this.list.reverse();
      });
    error => LoggerService.log('Error :' + error);
  }

  notesArchiveRequest(event) {
    if (event) {
      this.getNotes();
    }
  }

} 
