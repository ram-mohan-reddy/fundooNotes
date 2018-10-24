import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {
  
  constructor(private userService: HttpService) { }
  @Input() notesListArray: any;
  ngOnInit(){
    // this.notesList();  
  }

}
