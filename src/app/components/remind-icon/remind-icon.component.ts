import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { MatMenu } from '@angular/material';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-remind-icon',
  templateUrl: './remind-icon.component.html',
  styleUrls: ['./remind-icon.component.scss'],
  exportAs: 'menuInOtherComponent'
})
export class RemindIconComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenu) menu: MatMenu;
  private currentDate: Date;
  private date: Date = new Date();
  private customDate = this.date;
  // value;
  private customTime: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private notesService: GetNotesService) {

  }
  @Input() notesDetails: any;
  @Input() hideIcon: any;
  @Output() reminderEventClicked = new EventEmitter<boolean>();
  @Output() reminderArrayEvent = new EventEmitter<any>();
  @Output() editReminderEventClicked = new EventEmitter<any>();


  reminderMenu: boolean;
  reminder = [];

  ngOnInit() {
    this.currentDate = this.date;
    this.customTime = this.timeFormat(this.date);
  }

  timeFormat(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  myFilter = (d: Date): boolean => {
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const today = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    return day >= today;
  }

  displayDate(value) {
    if (this.notesDetails.id != undefined) {
      const date: Date = new Date();
      if (value == 'today') {
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, 20, 0, 0),
          "noteIdList": [this.notesDetails.id]
        }
        this.addReminder(note);
      }

      else if (value == 'nextDay') {
        var note = {
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 8, 0, 0),
          "noteIdList": [this.notesDetails.id]
        }
        this.addReminder(note);
      }
      else if (value == 'week') {
        if (date.getDay() == 6) {
          var note = {
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 8, 0, 0),
            "noteIdList": [this.notesDetails.id]
          }
          this.addReminder(note);
        }

        else if (date.getDay() == 5) {
          var note = {
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 8, 0, 0),
            "noteIdList": [this.notesDetails.id]
          }
          this.addReminder(note);
        }

        else if (date.getDay() == 4) {
          var note = {
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4, 8, 0, 0),
            "noteIdList": [this.notesDetails.id]
          }
          this.addReminder(note);
        }

        else if (date.getDay() == 3) {
          var note = {
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5, 8, 0, 0),
            "noteIdList": [this.notesDetails.id]
          }
          this.addReminder(note);
        }
        else if (date.getDay() == 2) {
          var note = {
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6, 8, 0, 0),
            "noteIdList": [this.notesDetails.id]
          }
          this.addReminder(note);
        }
        else if (date.getDay() == 1) {
          var note = {
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 8, 0, 0),
            "noteIdList": [this.notesDetails.id]
          }
          this.addReminder(note);
        }
        else if (date.getDay() == 0) {
          var note = {
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8, 8, 0, 0),
            "noteIdList": [this.notesDetails.id]
          }
          this.addReminder(note);
        }

      }
    }
    else {
      const date: Date = new Date();
      if (value == 'today') {
        this.reminder = [];
        this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 0, 20, 0, 0));
        this.reminderArrayEvent.emit(this.reminder);
      }

      else if (value == 'nextDay') {
        this.reminder = [];
        this.reminder.push(new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 8, 0, 0)));
        this.reminderArrayEvent.emit(this.reminder);
      }
      else if (value == 'week') {
        if (date.getDay() == 6) {
          this.reminder = [];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 8, 0, 0));
          this.reminderArrayEvent.emit(this.reminder);
        }

        else if (date.getDay() == 5) {
          this.reminder = [];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3, 8, 0, 0));
          this.reminderArrayEvent.emit(this.reminder);
        }

        else if (date.getDay() == 4) {
          this.reminder = [];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4, 8, 0, 0));
          this.reminderArrayEvent.emit(this.reminder);
        }

        else if (date.getDay() == 3) {
          this.reminder = [];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5, 8, 0, 0));
          this.reminderArrayEvent.emit(this.reminder);
        }
        else if (date.getDay() == 2) {
          this.reminder = [];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6, 8, 0, 0));
          this.reminderArrayEvent.emit(this.reminder);
        }
        else if (date.getDay() == 1) {
          this.reminder = [];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7, 8, 0, 0));
          this.reminderArrayEvent.emit(this.reminder);
        }
        else if (date.getDay() == 0) {
          this.reminder = [];
          this.reminder.push(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 8, 8, 0, 0));
          this.reminderArrayEvent.emit(this.reminder);
        }

      }
    }
  }

  addReminder(remainder) {
    this.notesService.notesPostService('api/notes/addUpdateReminderNotes', remainder)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.reminderEventClicked.emit(true);
        this.editReminderEventClicked.emit(remainder.reminder);
      });
    error => LoggerService.log('Error :' + error);

  }
  changeMenu() {
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
      splittedTime[0] = String(toInt + 12);
    }
    if (splittedTime.length == 8) {
      splittedTime[0] = splittedTime[0] + splittedTime[1];
      splittedTime.splice(1, 1);
    }
    var note = {
      "reminder": new Date(this.customDate.getFullYear(), this.customDate.getMonth(), this.customDate.getDate(), splittedTime[0], splittedTime[2] + splittedTime[3]),
      "noteIdList": [this.notesDetails.id]
    }
    if (this.notesDetails.id != undefined) {
      this.addReminder(note);
    }
    else {
      this.reminder = [];
      this.reminder.push(new Date(this.customDate.getFullYear(), this.customDate.getMonth(), this.customDate.getDate(), splittedTime[0], splittedTime[2] + splittedTime[3]));
      this.reminderArrayEvent.emit(this.reminder);
    }
  }

  @ViewChild('customInput') customInput: ElementRef;

  setFocus() {
    this.customInput.nativeElement.focus();
  }

  getTime() {
    var currentTime = this.currentDate.getTime();
    var time = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 8, 0, 0)
    var checkTime = time.getTime();
    return
  }

  ngOnDestroy() {
    LoggerService.log('On destroy works');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}
