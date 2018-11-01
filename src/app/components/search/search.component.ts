import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../services/notes/get-notes.service';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  list;
  totalNotes: any = [];
  constructor(private notesService : GetNotesService,public dataService: DataSharingService) { }
searchText : string;
  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      console.log(message);
      
      this.searchText = message;
      this.notesService.getNotes()
      .subscribe(data => {
        console.log(data);
        this.notesCollection(data) 
      });
      error => console.log('Error ', error);
    })
   
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
  }
}