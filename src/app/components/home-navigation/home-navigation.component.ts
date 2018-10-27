import { Component,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { MatDialog} from '@angular/material';
import { LabelDialogComponent } from '../label-dialog/label-dialog.component'

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css']
})
export class HomeNavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver,private userService: HttpService,public dialog: MatDialog) {}

  userName: string = ''; 
  email: string='';
  token: string='';

  ngOnInit() {

   console.log(localStorage.getItem('userName'));
   console.log(localStorage.getItem('email'));
   this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');
    this.token = localStorage.getItem('token')
  }

  logout() {
   console.log(this.token);
   
    this.userService.userLogout('api/user/logout',this.token)
    .subscribe(data => {
      console.log(data);
      localStorage.clear();
    window.location.replace('login');
        
      });
      error => console.log('Error ', error);         
  }
  createLabel(): void {
    const dialogRef = this.dialog.open(LabelDialogComponent, {
      width: '300px',
      position: { top: '250px', left: '450px'},
      panelClass: 'myapp-no-padding-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        console.log(result);

        error => console.log('Error ', error);
      }       
      console.log('The dialog was closed');
    });
 
}
}