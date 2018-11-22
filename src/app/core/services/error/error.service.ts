
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DataSharingService } from '../dataService/data-sharing.service';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const router = this.injector.get(Router);
    const dataService = this.injector.get(DataSharingService);
    // console.error('It happens: ', error);

      if (error instanceof HttpErrorResponse) {
        // Server or connection error happened
        if (!navigator.onLine) {
          // Handle offline error
          try {
            throw (error.status + ' ' + error.statusText);
          }
          catch (e) {
            console.log(e);
            dataService.changeMessage(e)
          }
        } else {
          // Handle Http Error (error.status === 403, 404...)
          try {
            throw (error.status + ' ' + error.statusText);
          }
          catch (e) {
            console.log(e);
            dataService.changeMessage(e)
          }
        }
      } else {

        console.log(error);
        router.navigate(['/error'], { queryParams: {error: error} });
        // Handle Client Error (Angular Error, ReferenceError...)     
      }

      // console.error('It happens: ', error);
    }
  }

