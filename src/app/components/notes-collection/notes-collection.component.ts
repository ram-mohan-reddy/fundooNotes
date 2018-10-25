import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {
  
  constructor() { }
  @Input() notesListArray: any;
  @Output() deleteRequest = new EventEmitter<boolean>();
  ngOnInit(){
    // this.notesList();  
  }
 
  childEventClicked(event) {
    console.log(event);
    console.log('in notes collection');
    if (event) {
      this.deleteRequest.emit(event);
    }
   
    }
}
