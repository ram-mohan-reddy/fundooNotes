import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})
export class NotesCollectionComponent implements OnInit {
  token: string;
  list;
  interval: any;
  constructor(private userService: HttpService) { }
  
  ngOnInit(){
    this.notesList();
    this.getNotes();
  }
notesList() {
  this.token = localStorage.getItem('token')
  this.userService.getNotesList('api/notes/getNotesList',this.token)
  .subscribe(data => {
    // console.log(data); 
    this.list =data['data'].data
    console.log(this.list);
    error => console.log('Error ', error);       
  });
}

getNotes(){
  this.interval = setInterval(() => {
    this.notesList();
  }, 1000);
}
}
