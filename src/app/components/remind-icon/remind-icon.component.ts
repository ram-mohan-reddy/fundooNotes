import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remind-icon',
  templateUrl: './remind-icon.component.html',
  styleUrls: ['./remind-icon.component.css']
})
export class RemindIconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayDate(value) {
    const date: Date = new Date();
    if (value == 'today') {
      console.log(date.toDateString());
    }

    else if (value == 'nextDay') {
      date.setDate(date.getDate() + 1);
      console.log(date.toDateString());
    }
    else if (value == 'week') {
      date.setDate(date.getDate() + 7);
      console.log(date.toDateString());
    }

  }

}
