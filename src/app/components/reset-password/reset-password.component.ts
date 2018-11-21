import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { UserService } from '../../core/services/users/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, public route: ActivatedRoute, public message: MatSnackBar) { }
  destroy$: Subject<boolean> = new Subject<boolean>();
 private newData = {
    "newPassword": ''
  }
  
  private ifEmpty:string = ''
  private token = this.route.snapshot.params.id;
  private confirmNewPassword : string = '';
  ngOnInit() {
  }
  setNewPassword() {
    if ((this.newData.newPassword == this.confirmNewPassword) && this.newData.newPassword != '' && this.confirmNewPassword != '') {
      this.changePassword();
    }
    else {
      this.ifEmpty = 'Enter password'
    }
  }
  changePassword() {
    localStorage.setItem('token', this.token);
    this.userService.userPostService('reset-password', this.newData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.newData.newPassword = '';
        this.confirmNewPassword = ''
        localStorage.removeItem('token')
        this.message.open('Password updated', 'Success', {
          duration: 5000,
        });
        error => {
          LoggerService.log('Error :' + error);
          this.message.open('Process failed', 'Sorry.!', {
            duration: 5000,
          });
        }
      });
  }

  ngOnDestroy() {
    LoggerService.log('On destroy works');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
