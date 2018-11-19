import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../core/services/httpService/http.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import {DeleteLabelComponent} from '../delete-label/delete-label.component';
import { MatDialog} from '@angular/material';
import { LoggerService } from '../../core/services/loggerService/logger.service';
@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss'] 
})
export class LabelDialogComponent implements OnInit {
  changeText: boolean = false;
  constructor( public dialogRef: MatDialogRef<LabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private userService: HttpService,
    private dataService: DataSharingService, public dialog: MatDialog) { }

    labelCollection:any;
    newLabelList: any;
    message: string;
    labelName : string;
    newLabelName: string;
    editData;
    notify: boolean = true;
    onAdd = new EventEmitter();
    onEdit = new EventEmitter();
    toCreate = new EventEmitter();
    editShow : boolean = true;
  ngOnInit() {  
    this.labelCollection = this.data.label;
  }
 
  deleteLabel(id){ 
    this.deleteLabelConfirmation(id);
  }

  editLabel(id){ 
this.editShow = id;
  }

  editLabelName(id){
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

  clearText() {
    this.labelName= null
  }

  createNewLabel() {
    if (this.labelName != undefined) {
      if (!this.labelCollection.some((data) => data.label == this.labelName)) {
        var newLabel = {
          'label': this.labelName
        }
        this.labelCollection.push(newLabel)
        this.toCreate.emit(this.labelName);
      }
      else {
        this.message = 'label name already exits'
      }
    }
  }

  deleteLabelConfirmation(id): void {
    const dialogRef = this.dialog.open(DeleteLabelComponent, {
      width: '500px',
      position: { top: '300px', left: '450px'},
      panelClass: 'myapp-no-padding-dialog',
      data: {componentName:"label"}
    }); 
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.newLabelList = [];
        this.userService.deleteLabel("api/noteLabels/" + id + '/deleteNoteLabel')
          .subscribe(data => {
            for (let index = 0; index < this.labelCollection.length; index++) {
              if (this.labelCollection[index].id != id) {
                this.newLabelList.push(this.labelCollection[index])
              }
            }
            this.labelCollection = this.newLabelList;
            this.onAdd.emit(true);
            this.dataService.eventTrigger(true)
          });
        error => LoggerService.log('Error :' + error);
      }
    });
} 
}
