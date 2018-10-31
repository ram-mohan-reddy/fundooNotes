import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { GetNotesService } from '../../services/notes/get-notes.service';
@Component({
  selector: 'app-more-icon',
  templateUrl: './more-icon.component.html',
  styleUrls: ['./more-icon.component.css']
})
export class MoreIconComponent implements OnInit {
  event: boolean = true
  @Output() eventClicked = new EventEmitter<boolean>();
  @Input() notesDetails: any;
  constructor(private notesService : GetNotesService) { }
  note : any;
  labelMenu: boolean = true;
  newLabelName: string;
  myArray = [];
  selectLabelArray = [];
  userId = localStorage.getItem('userId');
  labelData = {
    "label": "string",
    "isDeleted": false,
    "userId": "string"
  }
  ngOnInit() {  
    // this.getLabel();
  }
 
  deleteCard() {
    console.log(this.notesDetails); 
    this.note = {
      "isDeleted": true,
      "noteIdList":[this.notesDetails.id]
    }
    this.notesService.notesPostService('api/notes/trashNotes',this.note)
    .subscribe(data => {
      this.eventClicked.emit(this.event); 
      console.log(data);  
    });
    error => console.log('Error ', error);
  } 

  changeMenu(){
    console.log(this.labelMenu);
    // this.getLabel();
    if (this.labelMenu) { 
      this.labelMenu = !this.labelMenu
    }

    else {
      this.labelMenu = !this.labelMenu
    }
   
  }

  addLabelName(): void {
    console.log(this.newLabelName);
    if (this.newLabelName != undefined) {
      this.labelData.label = this.newLabelName;
      this.labelData.userId = this.userId;
      this.notesService.notesPostService('api/noteLabels', this.labelData)
        .subscribe(data => {
          console.log(data);
          this.getLabel();
        });
      error => console.log('Error ', error);

    }
  }

  getLabel(): void {
    this.notesService.getLabelData('api/noteLabels/getNoteLabelList')
      .subscribe(data => {
        console.log("get  :", data);
        this.myArray = [];
        for (let index = 0; index < data['data'].details.length; index++) {
          if (data['data'].details[index].isDeleted == false) {
            this.myArray.push(data['data'].details[index])
          }
        }
      });
}

onClick(value): void {
    this.notesService.notesPostService('api/notes/' + this.notesDetails.id + "/addLabelToNotes/" + value.id + '/add', {})
      .subscribe(data => {
        console.log(data);
        this.eventClicked.emit(this.event);
      });
    error => console.log('Error ', error);

  } 

}

