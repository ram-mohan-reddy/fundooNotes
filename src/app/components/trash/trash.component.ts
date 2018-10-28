import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { GetNotesService } from '../../services/notes/get-notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  totalNotes = [];
  token: string;
  list;

  firstArray;
  secondArray;
  thirdArray;
  constructor(private userService: HttpService,private notesService : GetNotesService) { }

  ngOnInit() {

    this.getNotes();
  }
  getNotes() {

    this.notesService.getNotes()
    .subscribe(data => {
      console.log(data);
 
      this.list = []; 
   
      for (let index = 0; index < data['data'].data.length; index++) {
        if (data['data'].data[index].isDeleted == true) {
          this.list.push(data['data'].data[index])
        }
      }
      this.totalNotes = this.list.reverse(); 
      this.firstArray = [];
      this.secondArray = [];
      this.thirdArray = [];
   
      for (let index = 0; index < (this.totalNotes.length)-2; index=index+3) {
        if (this.totalNotes[index].isDeleted == true) { 
          this.firstArray.push(this.totalNotes[index]);
          this.secondArray.push(this.totalNotes[index+1]);
          this.thirdArray.push(this.totalNotes[index+2]);
        }
      }
    });
    error => console.log('Error ', error);
  }
}
