import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { Notes } from '../../core/models/notes';
@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.scss']
})
export class ArchiveIconComponent implements OnInit {
  @Output() archiveEvent = new EventEmitter<boolean>();
  @Output() unArchiveEvent = new EventEmitter<boolean>();
  @Input() notesDetails:Notes;
  constructor(private notesService: GetNotesService) { }

  ngOnInit() {
  } 

  archiveRequest() {
    var note = {
      "isArchived": true,
      "noteIdList": [this.notesDetails.id]
    }

    if (this.notesDetails.id != undefined) {
      this.notesService.notesPostService('api/notes/archiveNotes',note)
        .subscribe(data => {
          this.archiveEvent.emit(true);
        });
      error => LoggerService.log('Error :' + error);
    }

    else {
      this.archiveEvent.emit(true);
    }
  }
  unArchiveRequest() {
    var note = {
      "isArchived": false,
      "noteIdList": [this.notesDetails.id]
    }
    this.notesService.notesPostService('api/notes/archiveNotes', note)
      .subscribe(data => {
        this.unArchiveEvent.emit(true);
      });
    error => LoggerService.log('Error :' + error);
  }
}
