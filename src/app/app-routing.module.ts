import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NotesComponent } from './components/notes/notes.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { AuthGuard as AuthGuardService } from './guards/auth.guard';

const routes: Routes = [
 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path:'resetpassword/:id',component: ResetPasswordComponent},
  { path:'home',component: HomePageComponent,children:[
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'notes'
  },
    {path:'notes',component: NotesComponent},
    {path:'reminders',component: RemindersComponent},
    {path:'archive',component: ArchiveComponent},
    {path:'trash',component: TrashComponent}
  ]},
  {path:'**',redirectTo: '/login'},

  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
 