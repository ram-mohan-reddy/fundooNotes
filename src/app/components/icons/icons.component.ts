import { Component, OnInit ,Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent  {

  constructor() { }

  message: boolean = true

  @Output() messageEvent = new EventEmitter<boolean>();

  sendMessage() {
    this.messageEvent.emit(this.message)
  }
}

 

