import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { Notes } from '../../core/models/notes';
import {Subject} from 'rxjs';
import{takeUntil} from 'rxjs/operators' 

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {
  private notes: Notes[] = [];
  private totalNotes: Notes[] = [];
  private list: Notes[] = [];
  constructor(private notesService: GetNotesService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit() {
    this.getNotes();
  }

  /*********************** This function used to get archived notes*********************/ 
  getNotes() {
    this.notesService.getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Notes[]) => {
        this.notes = data['data'].data;
        this.list = [];
        for (let index = this.notes.length-1; index >=0; index--) {
          if (this.notes[index].isArchived == true && this.notes[index].isPined == false){
            this.list.push(this.notes[index])
          }
        }
        this.totalNotes = this.list;
      });
    // error => LoggerService.log('Error :' + error);
  }

  // Event emitted to get updated notes after hitting archived or unarchived request
  notesArchiveRequest(event) {
    if (event) {
      this.getNotes();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }  
} 
