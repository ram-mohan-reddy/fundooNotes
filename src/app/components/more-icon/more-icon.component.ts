import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { GetNotesService } from '../../services/notes/get-notes.service';
@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.css']
})
export class MoreIconComponent implements OnInit {
  event: boolean = true
  @Output() eventClicked = new EventEmitter<boolean>();
  @Input() notesDetails: any;
  constructor(private notesService : GetNotesService) { }
  note : any;
  ngOnInit() {  
  }
 
  deleteCard() {
    console.log(this.notesDetails); 
    this.note = {
      "isDeleted": true,
      "noteIdList":[this.notesDetails.id]
    }
    this.notesService.deleteNotes(this.note)
    .subscribe(data => {
      this.eventClicked.emit(this.event); 
      console.log(data);  
    });
    error => console.log('Error ', error);
  } 
}
