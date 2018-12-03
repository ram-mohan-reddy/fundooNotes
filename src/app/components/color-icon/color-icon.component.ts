import { Component, OnInit, Input,Output, EventEmitter, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { Notes } from '../../core/models/notes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.scss']
})
export class ColorIconComponent implements OnInit, OnDestroy {
  private event: boolean = true
  @Output() colorEvent = new EventEmitter<boolean>();
  @Output() colorCodeEvent = new EventEmitter<string>();
  @Input() notesDetails:Notes;
 private colorArray:Array<object> = [[{ 'color': '#ffffff', 'name': 'White' },
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
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit() {
  }
  changeColor(colorCode) {
    this.colorCodeEvent.emit(colorCode)
    if (this.notesDetails != undefined) {
    var colorDetails = {
        "color": colorCode,
        "noteIdList": [this.notesDetails.id]
      }
    this.notesService.notesPostService('api/notes/changesColorNotes',colorDetails)
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.colorEvent.emit(this.event);  
    });       
    }    
  }

  ngOnDestroy() {
    LoggerService.log('On destroy works');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 
}
