import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { GetNotesService } from '../../services/notes/get-notes.service';

@Component({
  selector: 'app-color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.css']
})
export class ColorIconComponent implements OnInit {
  event: boolean = true
  @Output() colorEvent = new EventEmitter<boolean>();
  @Output() colorCodeEvent = new EventEmitter<string>();
  @Input() notesDetails;

  colorDetails ;

  colorArray = ['#ffffff','#f28b82','#fbbc04','#fff475','#ccff90','#a7ffeb','#cbf0f8','#aecbfa','#d7aefb','#fdcfe8','#e6c9a8','#e8eaed']

  constructor(private notesService : GetNotesService) { }

  ngOnInit() {
  }
  
  changeColor(colorCode) {
 this.colorCodeEvent.emit(this.colorArray[colorCode])
    console.log(this.colorArray[colorCode]);

    if (this.notesDetails != undefined) {

      console.log(this.notesDetails.id);
    this.colorDetails = {
      "color": this.colorArray[colorCode], 
      "noteIdList":[this.notesDetails.id]
    }

    this.notesService.notesPostService('api/notes/changesColorNotes',this.colorDetails)
    .subscribe(data => {
      this.colorEvent.emit(this.event);
      console.log(data);  
    });
    error => console.log('Error ', error);
      
    }
    
  }
}
