import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  list;
  totalNotes: any = [];
  searchText : string;
  constructor(private notesService : GetNotesService,public dataService: DataSharingService) {
    this.dataService.currentMessage.subscribe(message => {
    this.searchText = message;
    this.notesService.getNotes()
    .subscribe(data => {
      this.notesCollection(data) 
    });
    error => LoggerService.log('Error :' + error);
  })
}

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
  }
}
