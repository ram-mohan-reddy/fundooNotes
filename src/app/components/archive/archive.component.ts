import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { Notes } from '../../core/models/notes';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  private notes: Notes[] = [];
  private totalNotes: Notes[] = [];
  private list: Notes[] = [];
  constructor(private notesService: GetNotesService) { }

  ngOnInit() {
    this.getNotes();
  }

  /*********************** This function used to get archived notes*********************/ 
  getNotes() {
    this.notesService.getNotes()
      .subscribe((data: Notes[]) => {
        this.notes = data['data'].data;
        this.list = [];
        for (let index = 0; index < this.notes.length; index++) {
          if (this.notes[index].isArchived == true && this.notes[index].isPined == false){
            this.list.push(this.notes[index])
          }
        }
        this.totalNotes = this.list.reverse();
      });
    error => LoggerService.log('Error :' + error);
  }

  // Event emitted to get updated notes after hitting archived or unarchived request
  notesArchiveRequest(event) {
    if (event) {
      this.getNotes();
    }
  }
} 
