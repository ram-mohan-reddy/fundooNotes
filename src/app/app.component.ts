import { Component,OnInit } from '@angular/core';
import { MessageServiceService } from './core/services/messageService/message-service.service';
import { DataSharingService } from './core/services/dataService/data-sharing.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit{
  title = 'fundoo';
  constructor(private messageService : MessageServiceService,
    public dataService: DataSharingService,public message: MatSnackBar) { }
  ngOnInit() {
    this.messageService.getPermission();
    this.dataService.errorMessage.subscribe(message => {
      this.message.open( message, 'Retry', {
        duration: 500,
      });
     })
  }
}
 