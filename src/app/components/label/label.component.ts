import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  list;
  totalNotes: any = [];
  label : string;
  constructor(private notesService : GetNotesService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      console.log(params);
      if (params) { 
        this.label = params.id;
        this.notesService.getNotes()
        .subscribe(data => {
          console.log(data);
          this.notesCollection(data) 
        });
        error => console.log('Error ', error);
      }
    });
  }

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
    this.totalNotes = [];
    for (let index = 0; index < data['data'].data.length; index++) {
      if (data['data'].data[index].isDeleted == false) {
        for (let labelIndex = 0; labelIndex < data['data'].data[index].noteLabels.length; labelIndex++) {
          if (data['data'].data[index].noteLabels[labelIndex].label == this.label && data['data'].data[index].noteLabels[labelIndex].isDeleted == false) {
            this.list.push(data['data'].data[index])
          }
      }
    }
  
  }
  this.totalNotes = this.list.reverse();
  console.log(this.totalNotes);
}
}
