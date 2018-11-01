import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../services/http.service';
import { DataSharingService } from '../../services/data-sharing.service';
@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.css']
})
export class LabelDialogComponent implements OnInit {
  changeText: boolean = false;
  constructor( public dialogRef: MatDialogRef<LabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private userService: HttpService,
    private dataService: DataSharingService) { }

    labelCollection:any;
    newLabelList: any
    labelName : string;
    newLabelName: string;
    editData;
    notify: boolean = true;
    onAdd = new EventEmitter();
    onEdit = new EventEmitter();
    editShow : boolean = true;
  ngOnInit() {  
    console.log(this.data.label);
    this.labelCollection = [];
    for (let index = 0; index < this.data.label.length; index++) {
      this.labelCollection.push(this.data.label[index])
    }
  }
 
  deleteLabel(id){
    console.log('delete activated');
    this.newLabelList = [];
    this.userService.deleteLabel("api/noteLabels/"+ id +'/deleteNoteLabel' )
    .subscribe(data => {
      console.log(data);
      for (let index = 0; index < this.labelCollection.length; index++) {
        if (this.labelCollection[index].id != id ) {
          this.newLabelList.push(this.labelCollection[index])
        }
      }
      console.log(this.newLabelList);
      this.labelCollection = this.newLabelList;
      this.onAdd.emit(true);
      this.dataService.eventTrigger(true)
      });
      error => console.log('Error ', error);
  }

  editLabel(id){
this.editShow = id;
  }

  editLabelName(id){
    console.log('edit clicked');
    console.log(this.newLabelName);
    for (let index = 0; index < this.labelCollection.length; index++) {
      if (this.labelCollection[index].id == id) {
        this.labelCollection[index].label = this.newLabelName;
        this.editData = {

          "label": this.newLabelName,
          "isDeleted": false,
          "id": id,
          "userId":  this.labelCollection[index].userId
    
        }
      }
    }
   this.editShow = !this.editShow;
   
   this.onEdit.emit(this.editData);
  }

}
