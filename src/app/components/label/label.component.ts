import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import {Router} from '@angular/router';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
  list;
  totalNotes: any = [];
  label : string;
  constructor(private notesService : GetNotesService, private route: ActivatedRoute,
    public dataService: DataSharingService,public router : Router) { 
    this.route.params.subscribe(params => {
      if (params) { 
        this.label = params.id;
        this.notesService.getNotes()
        .subscribe(data => {
          this.notesCollection(data) 
        });
        error => LoggerService.log('Error :' + error);
      }
    });

    this.dataService.currentMessage.subscribe(message => {
      if (message) {
        this.label = message;
        this.navigate(message);
        this.notesService.getNotes()
        .subscribe(data => {
          this.notesCollection(data) 
        });
        error => LoggerService.log('Error :' + error);
      }
     
    })
  }

  ngOnInit() {
    this.notesService.getNotes()
    .subscribe(data => {
      this.notesCollection(data) 
    });
    error => LoggerService.log('Error :' + error);
  } 
  

  notesAddRequest(event) {
    if (event) {
      this.notesService.getNotes().subscribe(data => {
         this.notesCollection(data)
      });
      error => LoggerService.log('Error :' + error);
    }
  }

  navigate(message){
    var path = '/home/labels/'+message;
    this.dataService.changeIdentityEventTrigger(message)
    this.router.navigateByUrl(path)
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
}
}
