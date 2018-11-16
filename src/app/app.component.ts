import { Component,OnInit } from '@angular/core';
import { MessageServiceService } from './core/services/messageService/message-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fundoo';
  constructor(private messageService : MessageServiceService) { }
  ngOnInit() {
    this.messageService.getPermission();
  }
}
 