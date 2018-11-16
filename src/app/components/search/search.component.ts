import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  list;
  totalNotes: any = [];
  searchText : string;
  constructor(private notesService : GetNotesService,public dataService: DataSharingService) {this.dataService.currentMessage.subscribe(message => {
    this.searchText = message;
    this.notesService.getNotes()
    .subscribe(data => {
      console.log(data);
      this.notesCollection(data) 
    });
    error => console.log('Error ', error);
  }) }

  ngOnInit() {
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
