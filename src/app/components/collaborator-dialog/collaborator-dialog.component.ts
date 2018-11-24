import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatMenuTrigger, MatDialog } from '@angular/material';
import{environment} from '../../../environments/environment'
import { UserService } from '../../core/services/users/user.service';
import { DeleteLabelComponent } from '../delete-label/delete-label.component';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'; 

@Component({
  selector: 'app-collaborator-dialog',
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss'] 
})
export class CollaboratorDialogComponent implements OnInit, OnDestroy  {

  constructor(public dialogRef: MatDialogRef<CollaboratorDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, public userService:UserService,
      private notesService: GetNotesService,public dialog: MatDialog) { 
      dialogRef.disableClose = true;
      dialogRef.backdropClick().subscribe(result => {
       this.discardConfirmation(); 
      });
    }

  private savedUrl:string='';
  private url:string='';
  private email:string='';
  private userName:string='';
  private personSearch:string='';
  private server_url = environment.baseUrl;
  private show:boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  collaboratorList:any=[];
  userArray:any=[];
  @ViewChild(MatMenuTrigger) showList: MatMenuTrigger;
  ngOnInit() {
  this.savedUrl = this.data.note.user.imageUrl;
  this.url = this.server_url + this.savedUrl;
  this.email = localStorage.getItem('email');
  this.userName = localStorage.getItem('userName');
  console.log(this.data.note);
  }

  onKey() {
    if (this.personSearch != '') {
      this.showList.openMenu();
      this.show = true
      let search = {
        'searchWord' : this.personSearch
      }
      this.userService.userPostService('searchUserList',search)
      .subscribe(data => {
        
        this.userArray = data['data']['details'];
      });
    }
  }

getEmail(receiverEmail){ 
  this.personSearch = receiverEmail;
}

addPerson(receiverEmail) {
  this.personSearch = '';
  this.show = !this.show;
  let index = this.userArray.findIndex(x => x.email== receiverEmail);
  console.log(this.userArray[index]);
  this.collaboratorList.push(this.userArray[index]);
  this.userArray = [];
}

removePerson(receiverEmail) {
  console.log('in remove');
  let index = this.collaboratorList.findIndex(x => x.email== receiverEmail);
  if (index !== -1) {
    this.collaboratorList.splice(index, 1);
  }
}

discardConfirmation(): void {
  if (this.collaboratorList.length != 0) {
    const dialogRef = this.dialog.open(DeleteLabelComponent, {
      width: '500px',
      panelClass: 'myapp-no-padding-dialog',
      data: { componentName: "collaboratorDialog" }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }

  else {
    this.dialogRef.close();
  }
 
}

onNoClick(): void {
  this.dialogRef.close();
}

deleteCollaboratorPerson(details) {

  this.notesService.deleteService("api/notes/" +this.data.note.id+ '/removeCollaboratorsNotes/'+ details.userId)
  .pipe(takeUntil(this.destroy$))
  .subscribe(data => {
   console.log(data);
   
  });

}

addCollaborator() {
  if (this.personSearch != '') {
    console.log(this.personSearch);
    let index = this.userArray.findIndex(x => x.email== this.personSearch);
    console.log(this.userArray[index]);
    this.collaboratorList.push(this.userArray[index]);
    this.userArray = [];
    this.dialogRef.close(this.collaboratorList)
  }

  else {
    this.dialogRef.close(this.collaboratorList)
  }
}

ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
} 

}
