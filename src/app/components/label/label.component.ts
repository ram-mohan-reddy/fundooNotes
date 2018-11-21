import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { Router } from '@angular/router';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { Notes } from '../../core/models/notes';
import {Subject} from 'rxjs';
import{takeUntil} from 'rxjs/operators' 

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnDestroy {
  list: Notes[] = [];
  note: Notes[] = [];
  totalNotes: Notes[] = [];
  pinedNotes: Notes[] = [];
  label: string = '';
  constructor(private notesService: GetNotesService, private route: ActivatedRoute,
    public dataService: DataSharingService, public router: Router) {
    this.route.params.subscribe(params => {
      if (params) {
        this.label = params.id;
        this.getNotes();
      }
    });
    this.dataService.currentMessage.subscribe(message => {
      if (message) {
        this.label = message;
        var path: string = this.router.url
        var words = path.split('/');
        if (words[2] == 'labels') {
          this.navigate(message);
        }
        this.getNotes();
      }

    })
  }
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: Notes[]) => {
      this.note = data['data'].data;
      this.notesCollection(this.note)
    });
    error => LoggerService.log('Error :' + error);
  }

  notesAddRequest(event) {
    if (event) {
      this.getNotes();
    }
  }

  navigate(message) {
    var path = '/home/labels/' + message;
    this.dataService.changeIdentityEventTrigger(message)
    this.router.navigateByUrl(path)
  }

  notesCollection(data) {
    this.list = [];
    this.totalNotes = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].isDeleted == false && data[index].isPined == false) {
        for (let labelIndex = 0; labelIndex < data[index].noteLabels.length; labelIndex++) {
          if (data[index].noteLabels[labelIndex].label == this.label && data[index].noteLabels[labelIndex].isDeleted == false) {
            this.list.push(data[index])
          }
        }
      }
    }
    this.totalNotes = this.list.reverse();
    this.list = [];
    for (let index = 0; index < data.length; index++) {
      if (data[index].isDeleted == false && data[index].isPined == true) {
        for (let labelIndex = 0; labelIndex < data[index].noteLabels.length; labelIndex++) {
          if (data[index].noteLabels[labelIndex].label == this.label && data[index].noteLabels[labelIndex].isDeleted == false) {
            this.list.push(data[index])
          }
        }
      }

    }
    this.pinedNotes = this.list.reverse();
  }

  ngOnDestroy() {
    LoggerService.log('On destroy works');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 
}
