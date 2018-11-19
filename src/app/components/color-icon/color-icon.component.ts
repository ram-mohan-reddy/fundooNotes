import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.scss']
})
export class ColorIconComponent implements OnInit {
  event: boolean = true
  @Output() colorEvent = new EventEmitter<boolean>();
  @Output() colorCodeEvent = new EventEmitter<string>();
  @Input() notesDetails;
  colorDetails ;
  colorArray = [[{ 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' }],

  [{ 'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' }],

  [{ 'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' }]]
  constructor(private notesService : GetNotesService) { }
  ngOnInit() {
  }
  changeColor(colorCode) {
    this.colorCodeEvent.emit(colorCode)
    if (this.notesDetails != undefined) {
      this.colorDetails = {
        "color": colorCode,
        "noteIdList": [this.notesDetails.id]
      }
    this.notesService.notesPostService('api/notes/changesColorNotes',this.colorDetails)
    .subscribe(data => {
      this.colorEvent.emit(this.event);  
    });
    error => LoggerService.log('Error :' + error);       
    }    
  }
}
