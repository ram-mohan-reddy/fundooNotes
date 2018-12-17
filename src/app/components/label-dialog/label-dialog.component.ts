import { Component, OnInit, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/httpService/http.service';
import { DataSharingService } from '../../core/services/dataService/data-sharing.service';
import { DeleteLabelComponent } from '../delete-label/delete-label.component';
import { MatDialog } from '@angular/material';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { Label } from '../../core/models/label';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'; 
import { GetNotesService } from '../../core/services/notes/get-notes.service';
@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.scss']
})
export class LabelDialogComponent implements OnInit, OnDestroy {
  changeText: boolean = false;
  constructor(public dialogRef: MatDialogRef<LabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: HttpService,
    private notesService: GetNotesService, private dataService: DataSharingService, public dialog: MatDialog) { }

  private labelCollection: Label[] = [];
  private newLabelList: Label[] = [];
  private message: string = '';
  private labelName: string = '';
  private newLabelName: string = '';
  onAdd = new EventEmitter<boolean>();
  onEdit = new EventEmitter<Label>();
  toCreate = new EventEmitter<string>();
  private editShow: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngOnInit() {
    this.labelCollection = this.data.label;
  }

  deleteLabel(id) {
    this.deleteLabelConfirmation(id);
  }

  editLabel(id) {
    this.editShow = id;
  }

  editLabelName(id) {
    for (let index = 0; index < this.labelCollection.length; index++) {
      if (this.labelCollection[index].id == id) {
        this.labelCollection[index].label = this.newLabelName;
        var editData = {
          "label": this.newLabelName,
          "isDeleted": false,
          "id": id,
          "userId": this.labelCollection[index].userId
        }
      }
    }
    this.editShow = !this.editShow;
    this.onEdit.emit(editData);
  }

  clearText() {
    this.labelName = null
  }

  createNewLabel() {
    if (this.labelName != undefined) {
      if (!this.labelCollection.some((data) => data.label == this.labelName)) {

        var newLabel = {
          'label': this.labelName,
          'id': '',
          'isDeleted': false,
          'userId': ''
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
      panelClass: 'myapp-no-padding-dialog',
      data: { componentName: "label" }
    });

    dialogRef.afterClosed().subscribe(result => { 
      if (result) {
        this.newLabelList = [];
        this.notesService.deleteService("api/noteLabels/" + id + '/deleteNoteLabel')
          .pipe(takeUntil(this.destroy$))
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
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 
}
