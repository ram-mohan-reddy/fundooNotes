import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../services/notes/get-notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  token: string;
  list;
  totalNotes: any = [];

  firstArray;
  secondArray;
  thirdArray;
  constructor(private notesService : GetNotesService) { }

  ngOnInit() { 
    this.notesService.getNotes()
    .subscribe(data => {
      console.log(data);
      this.notesCollection(data) 
    });
    error => console.log('Error ', error);
  }

  notesAddRequest(event) {
    if (event) {
      console.log(event);
      this.notesService.getNotes().subscribe(data => {
        console.log(data);
         this.notesCollection(data)
      });
      error => console.log('Error ', error);
    }
  }

  notesCollection(data) {
    this.list = []; 
   
        for (let index = 0; index < data['data'].data.length; index++) {
          if (data['data'].data[index].isDeleted == false) {
            this.list.push(data['data'].data[index])
          }
        }
        this.totalNotes = this.list.reverse(); 
        console.log(this.totalNotes);
        
        this.firstArray = [];
        this.secondArray = [];
        this.thirdArray = [];
     
        for (let index = 0; index < this.totalNotes.length; index++) {
         console.log(index);
         
         if (index % 3 == 0) {
          this.firstArray.push(this.totalNotes[index]);
         }  
         else if (index % 3 == 1) {
          this.secondArray.push(this.totalNotes[index]);
         }
         else 
         {
          this.thirdArray.push(this.totalNotes[index]);
         }  
         
        }   
  }
}
