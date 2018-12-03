import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { HttpService } from '../../core/services/httpService/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Notes } from '../../core/models/notes';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit, OnDestroy {
  private totalNotes: Notes[] = [];
  private list: Notes[] = [];
  private note: Notes[] = [];
  token: string = localStorage.getItem('token')
  constructor(private notesService: HttpService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  private spinner: boolean = false;

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.spinner = true;
    this.notesService.getNotesList('api/notes/getReminderNotesList')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Notes[]) => {
        this.spinner = false;
        this.notesCollection(data)
      });
    // error => LoggerService.log('Error :' + error);
  }
  notesAddRequest(event) {
    if (event) {
      this.getNotes();
    }
  }
  notesCollection(data) {
    this.list = [];
    this.note = data['data'].data;
    for (let index = 0; index < this.note.length; index++) {
      if (this.note[index].isDeleted == false && this.note[index].isArchived == false) {
        this.list.push(this.note[index])
      }
    }
    this.totalNotes = this.list;
    this.totalNotes.sort(this.compare);
    // LoggerService.log('Notes : ', this.totalNotes);
  }
  compare(first, second) {
    first = new Date(first.reminder);
    second = new Date(second.reminder);
    if (first < second)
      return -1;
    if (first > second)
      return 1;
    return 0;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
