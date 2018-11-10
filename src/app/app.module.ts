import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,
        ReactiveFormsModule}   from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        MatTooltipModule,
        MatDialogModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule} from '@angular/material';
import { ChecklistModule } from 'angular-checklist';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Services
import {HttpService} from './core/services/httpService/http.service'
import {LoggerService} from './core/services/loggerService/logger.service';
import {DataSharingService} from './core/services/dataService/data-sharing.service';
import {GetNotesService} from './core/services/notes/get-notes.service';
import {AuthService} from './core/services/auth/auth.service';

// Guards and Pipes
import {AuthGuard} from './core/guards/auth.guard';
import { SearchPipe } from './core/pipes/search.pipe';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HomeNavigationComponent } from './components/home-navigation/home-navigation.component';
import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { IconsComponent } from './components/icons/icons.component';
import { RemindIconComponent } from './components/remind-icon/remind-icon.component';
import { ColorIconComponent } from './components/color-icon/color-icon.component';
import { ImageIconComponent } from './components/image-icon/image-icon.component';
import { ArchiveIconComponent } from './components/archive-icon/archive-icon.component';
import { MoreIconComponent } from './components/more-icon/more-icon.component';
import { CollaboratorIconComponent } from './components/collaborator-icon/collaborator-icon.component';
import { NotesCollectionComponent } from './components/notes-collection/notes-collection.component';
import { NotesCreationComponent } from './components/notes-creation/notes-creation.component';
import { LabelComponent } from './components/label/label.component';
import { SearchComponent } from './components/search/search.component';
import { DeleteLabelComponent } from './components/delete-label/delete-label.component';

// Dialog components
import { DialogComponent } from './components/dialog/dialog.component';
import { LabelDialogComponent } from './components/label-dialog/label-dialog.component';
import { ImageCropDialogComponent } from './components/image-crop-dialog/image-crop-dialog.component';


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
    ImageCropDialogComponent,
  ],
  entryComponents : [DialogComponent,
                    LabelDialogComponent,
                    DeleteLabelComponent,ImageCropDialogComponent],
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
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ImageCropperModule
  ],
  providers: [HttpService,
              AuthService,
              AuthGuard,
              GetNotesService,
              DataSharingService,
              LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 