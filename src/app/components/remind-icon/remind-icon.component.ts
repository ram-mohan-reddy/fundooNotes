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
  customDate = this.date;
  
  customTime:any;
  constructor(private notesService: GetNotesService) { } 
  @Input() notesDetails: any;
  @Output() reminderEventClicked = new EventEmitter<boolean>(); 
  @Output() reminderArrayEvent = new EventEmitter<any>();
  @Output() editReminderEventClicked = new EventEmitter<any>();

  
  reminderMenu: boolean; 
  reminder=[];

  ngOnInit() {
  this.currentDate= this.date;
  this.customTime = this.timeFormat(this.date)
  }

  timeFormat(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  displayDate(value) {
    if (this.notesDetails.id != undefined) {
      const date: Date = new Date();
    if (value == 'today') {
      this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, 20, 0, 0));
      var note = {
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, 20, 0, 0),
        "noteIdList":[this.notesDetails.id]
      }
      this.addReminder(note);
    }

    else if (value == 'nextDay') {
      this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 8, 0, 0));
      var note = {
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 8, 0, 0),
        "noteIdList":[this.notesDetails.id]
      }
      this.addReminder(note);
    }
    else if (value == 'week') {
      console.log(date.getDay());

      if (date.getDay() == 6) {
        this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }
      
      else if (date.getDay() == 5) {
        this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }

      else if (date.getDay() == 4) {
        this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }

      else if (date.getDay() == 3) {
        this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }
      else if (date.getDay() == 2) {
        this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }
      else if (date.getDay() == 1) {
        this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }
      else if (date.getDay() == 0) {
        this.editReminderEventClicked.emit(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8, 8, 0, 0));
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8, 8, 0, 0),
          "noteIdList":[this.notesDetails.id]
        }
        this.addReminder(note);
      }
      
    }
    }
    else {
      const date: Date = new Date();
      if (value == 'today') {
        this.reminder=[];
        this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, 20, 0, 0));         
        this.reminderArrayEvent.emit(this.reminder);  
      }
  
      else if (value == 'nextDay') {
        console.log();
        this.reminder=[];
        this.reminder.push(new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 8, 0, 0)));         
        this.reminderArrayEvent.emit(this.reminder);
      }
      else if (value == 'week') {
        console.log(date.getDay());
  
        if (date.getDay() == 6) {
          this.reminder=[];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 8, 0, 0));         
          this.reminderArrayEvent.emit(this.reminder);
        }
        
        else if (date.getDay() == 5) {
          this.reminder=[];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 8, 0, 0));         
          this.reminderArrayEvent.emit(this.reminder);
        }
  
        else if (date.getDay() == 4) {
          this.reminder=[];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4, 8, 0, 0));         
          this.reminderArrayEvent.emit(this.reminder);
        }
  
        else if (date.getDay() == 3) {
          this.reminder=[];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5, 8, 0, 0));         
          this.reminderArrayEvent.emit(this.reminder);
        }
        else if (date.getDay() == 2) {
          this.reminder=[];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6, 8, 0, 0));         
          this.reminderArrayEvent.emit(this.reminder);
        }
        else if (date.getDay() == 1) {
          this.reminder=[];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 8, 0, 0));         
          this.reminderArrayEvent.emit(this.reminder);
        }
        else if (date.getDay() == 0) {
          this.reminder=[];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8, 8, 0, 0));         
          this.reminderArrayEvent.emit(this.reminder);
        }
        
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
  changeMenu(){
    if (this.reminderMenu) { 
      this.reminderMenu = !this.reminderMenu
    }
    else {
      this.reminderMenu = !this.reminderMenu
    }
  } 

  changeMenuValue() {
    this.reminderMenu = false;
  }

  customReminder() {
    var splittedTime = this.customTime.split("");
    if (splittedTime[5] === 'P') {
      var toInt = Number(splittedTime[0]);
      splittedTime[0] = String(toInt+12);      
    }
    var note = {
      "reminder": new Date(this.customDate.getFullYear(), this.customDate.getMonth(), this.customDate.getDate(), splittedTime[0], splittedTime[2] + splittedTime[3]),
      "noteIdList":[this.notesDetails.id]
    }
    if (this.notesDetails.id != undefined) {
    this.editReminderEventClicked.emit(new Date(this.customDate.getFullYear(), this.customDate.getMonth(), this.customDate.getDate(), splittedTime[0], splittedTime[2] + splittedTime[3]))
    this.addReminder(note);
  }
  else {
    this.reminder=[];
    this.reminder.push(new Date(this.customDate.getFullYear(), this.customDate.getMonth(), this.customDate.getDate(), splittedTime[0], splittedTime[2] + splittedTime[3]));         
    this.reminderArrayEvent.emit(this.reminder);
  }
}


}
