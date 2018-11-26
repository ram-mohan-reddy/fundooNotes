import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Notes } from '../../core/models/notes';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit, OnDestroy {

  private totalNotes: Notes[] = [];
  private list: Notes[] = [];
  private note: Notes[]=[];
  private componentName: string = 'trash';
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService: GetNotesService) { }
  ngOnInit() {
    this.getNotes();
  }
  getNotes() {
    this.notesService.getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Notes[]) => {
        this.note = data['data'].data;
        this.list = [];
        for (let index = this.note.length-1; index >= 0 ; index--) {
          if (this.note[index].isDeleted == true) {
            this.list.push(this.note[index])
          }
        }
        this.totalNotes = this.list;
      });
    // error => LoggerService.log('Error :' + error);
  }

  notesDeleteRequest(event) {
    if (event) {
      this.getNotes();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
