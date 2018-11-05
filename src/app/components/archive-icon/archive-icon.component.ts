import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.css']
})
export class ArchiveIconComponent implements OnInit {
  @Output() archiveEvent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  archiveRequest() {
    this.archiveEvent.emit(true);
  }

}
