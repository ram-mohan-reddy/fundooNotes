import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { FlexLayoutModule } from "@angular/flex-layout";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { ChecklistModule } from 'angular-checklist';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeNavigationComponent } from './components/home-navigation/home-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { IconsComponent } from './components/icons/icons.component';
import { RemindIconComponent } from './components/remind-icon/remind-icon.component';
import { ColorIconComponent } from './components/color-icon/color-icon.component';
import { ImageIconComponent } from './components/image-icon/image-icon.component';
import { ArchiveIconComponent } from './components/archive-icon/archive-icon.component';
import { MoreIconComponent } from './components/more-icon/more-icon.component';
import { CollaboratorIconComponent } from './components/collaborator-icon/collaborator-icon.component';
import { NotesCollectionComponent } from './components/notes-collection/notes-collection.component';
import { NotesCreationComponent } from './components/notes-creation/notes-creation.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard  } from './guards/auth.guard';
import { GetNotesService } from './services/notes/get-notes.service';
import { LabelDialogComponent } from './components/label-dialog/label-dialog.component';
import { LabelComponent } from './components/label/label.component';
import { SearchPipe } from './pipes/search.pipe';
import { DataSharingService } from './services/data-sharing.service';
import { SearchComponent } from './components/search/search.component';
import { DeleteLabelComponent } from './components/delete-label/delete-label.component';

 

@NgModule({
  declarations: [ 
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    HomePageComponent,
    HomeNavigationComponent,
    NotesComponent,
    RemindersComponent,
    ArchiveComponent,
    TrashComponent,
    DialogComponent,
    IconsComponent,
    RemindIconComponent,
    ColorIconComponent,
    ImageIconComponent,
    ArchiveIconComponent,
    MoreIconComponent,
    CollaboratorIconComponent,
    NotesCollectionComponent,
    NotesCreationComponent,
    LabelDialogComponent,
    LabelComponent,
    SearchPipe,
    SearchComponent,
    DeleteLabelComponent,
  ],
  entryComponents : [DialogComponent,LabelDialogComponent,DeleteLabelComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    ChecklistModule,
    MatChipsModule
   
  ],
  providers: [HttpService,AuthService,AuthGuard,GetNotesService,DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 