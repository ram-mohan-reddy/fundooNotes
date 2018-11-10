import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';

@Component({
  selector: 'app-remind-icon', 
  templateUrl: './remind-icon.component.html',
  styleUrls: ['./remind-icon.component.css']
})
export class RemindIconComponent implements OnInit {

  currentDate:any;
  date: Date = new Date();
  constructor(private notesService: GetNotesService) { } 
  @Input() notesDetails: any;
  @Output() reminderEventClicked = new EventEmitter<boolean>();

  ngOnInit() {
  this.currentDate= this.date;
  }

  displayDate(value) {
    const date: Date = new Date();
    if (value == 'today') {
      console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, 20, 0, 0));
      var note = {
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, 20, 0, 0),
        "noteIdList":[this.notesDetails.id]
      }
      this.addReminder(note);
    }

    else if (value == 'nextDay') {
      console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 8, 0, 0));
      var note = {
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 8, 0, 0),
        "noteIdList":[this.notesDetails.id]
      }
      this.addReminder(note);
    }
    else if (value == 'week') {
      console.log(date.getDay());

      if (date.getDay() == 6) {
        console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }
      
      else if (date.getDay() == 5) {
        console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }

      else if (date.getDay() == 4) {
        console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }

      else if (date.getDay() == 3) {
        console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }
      else if (date.getDay() == 2) {
        console.log(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }
    }

  }

  addReminder(remainder) {
    this.notesService.notesPostService('api/notes/addUpdateReminderNotes',remainder)
    .subscribe(data => {
      console.log(data);
      this.reminderEventClicked.emit(true);
      
    });
  error => console.log(error);
  
  }
}
