import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.scss']
})
export class ArchiveIconComponent implements OnInit {
  @Output() archiveEvent = new EventEmitter<boolean>();
  @Output() unArchiveEvent = new EventEmitter<boolean>();
  @Input() notesDetails: any;
  note : any;
  constructor(private notesService : GetNotesService) { }

  ngOnInit() {
  }

  archiveRequest() {

    console.log(this.notesDetails); 
    this.note = {
      "isArchived": true,
      "noteIdList":[this.notesDetails.id]
    }

    console.log(this.notesDetails.id);
    

    if (this.notesDetails.id != undefined) {
      this.notesService.notesPostService('api/notes/archiveNotes',this.note)
      .subscribe(data => {
        console.log(data);  
        this.archiveEvent.emit(true);
      });
      error => console.log('Error ', error);
    }

    else {
      this.archiveEvent.emit(true);
    }
   
   
  }

  unArchiveRequest() {
    console.log(this.notesDetails); 
    this.note = {
      "isArchived": false,
      "noteIdList":[this.notesDetails.id]
    }
    this.notesService.notesPostService('api/notes/archiveNotes',this.note)
    .subscribe(data => {
      console.log(data);  
      this.unArchiveEvent.emit(true);
    });
    error => console.log('Error ', error);
   
  }

}
