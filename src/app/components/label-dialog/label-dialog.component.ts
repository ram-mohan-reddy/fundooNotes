import { Component, OnInit,Inject,EventEmitter } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../services/http.service';
import { DataSharingService } from '../../services/data-sharing.service';
import {DeleteLabelComponent} from '../delete-label/delete-label.component';
import { MatDialog} from '@angular/material';
@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.css'] 
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
    console.log(this.data.label);
    this.labelCollection = this.data.label;
  }
 
  deleteLabel(id){ 
    console.log('delete activated');
    this.deleteLabelConfirmation(id);
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

  clearText() {
    console.log('clear clicked');
    this.labelName= null
  }

  createNewLabel() {
    if (this.labelName != undefined) {
      if (!this.labelCollection.some((data) => data.label == this.labelName)) {
        console.log('create new label');
        var newLabel = {
          'label': this.labelName
        }
        this.labelCollection.push(newLabel)
        this.toCreate.emit(this.labelName);
      }
      else {
        console.log('label name already exits');
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
      console.log(result);
      if (result) {
        this.newLabelList = [];
        this.userService.deleteLabel("api/noteLabels/" + id + '/deleteNoteLabel')
          .subscribe(data => {
            console.log(data);
            for (let index = 0; index < this.labelCollection.length; index++) {
              if (this.labelCollection[index].id != id) {
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
    });
} 
}
