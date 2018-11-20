import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../../core/services/loggerService/logger.service';
import { HttpService } from '../../core/services/httpService/http.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  list;
  totalNotes: any = [];
  token: string = localStorage.getItem('token') 
  constructor(private notesService : HttpService) { }

  ngOnInit() { 
    this.notesService.getNotesList('api/notes/getReminderNotesList')
    .subscribe(data => {
      this.notesCollection(data) 
    });
    error => LoggerService.log('Error :' + error);
  }

  notesAddRequest(event) {
    if (event) {
      this.notesService.getNotesList('api/notes/getReminderNotesList').subscribe(data => {
      this.notesCollection(data)
      });
      error => LoggerService.log('Error :' + error);
    }
  } 

  notesCollection(data) {
    this.list = [];

    for (let index = 0; index < data['data'].data.length; index++) {
      if (data['data'].data[index].isDeleted == false && data['data'].data[index].isArchived == false) {
        this.list.push(data['data'].data[index])
      }
    }
    this.totalNotes = this.list.reverse();
    this.totalNotes.sort(this.compare);
    LoggerService.log('Notes : ',this.totalNotes );
  }
  compare(first,second) {
    first = new Date(first.reminder);
    second = new Date(second.reminder);
    if (first < second)
      return -1;
    if (first > second)
      return 1;
    return 0;
  }
}
