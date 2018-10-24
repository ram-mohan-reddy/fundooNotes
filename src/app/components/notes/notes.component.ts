import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  token: string;
  list;
  interval: any;
  totalNotes : any = [];

  constructor(private userService: HttpService) { }
  
  ngOnInit() {
this.getNotes();
  }

  childEventClicked(event) {

if (event) {

  console.log(event);
  
  this.getNotes();
}

    // this.getNotes()
    // this.token = localStorage.getItem('token')
    // this.userService.getNotesList('api/notes/getNotesList',this.token)
    // .subscribe(data => {
    //   console.log(data); 
    //   this.list = data['data'].data;
    //   this.totalNotes = this.list.reverse(); 
    //   error => console.log('Error ', error);       
    // });
    
  }

  getNotes() {
    this.token = localStorage.getItem('token')
    this.userService.getNotesList('api/notes/getNotesList',this.token)
    .subscribe(data => {
      console.log(data); 
      this.list = data['data'].data;
      this.totalNotes = this.list.reverse(); 
      error => console.log('Error ', error);       
    });
  }

}
