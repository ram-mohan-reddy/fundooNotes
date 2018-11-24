import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Notes } from '../../core/models/notes';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private totalNotes: Notes[] = [];
  private list: Notes[] = [];
  private note: Notes[] = [];
  private searchText: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService: GetNotesService, public dataService: DataSharingService) {
    this.dataService.currentMessage.subscribe(message => {
      this.searchText = message;
      this.notesService.getNotes()
        .subscribe((data: Notes[]) => {
          this.notesCollection(data)
        });
      // error => LoggerService.log('Error :' + error);
    })
  }

  ngOnInit() {
  }
  notesCollection(data) {
    this.note = data['data'].data;
    this.list = [];
    for (let index = this.note.length-1; index >=0; index--) {
      if (this.note[index].isDeleted == false) {
        this.list.push(this.note[index])
      }
    }
    this.totalNotes = this.list;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
