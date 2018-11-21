
import { ErrorHandler, Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(error: Error) {
    // Do whatever you like with the error (send it to the server?)
    // And log it to the console
    console.error('It happens: ', error);
 }
}
