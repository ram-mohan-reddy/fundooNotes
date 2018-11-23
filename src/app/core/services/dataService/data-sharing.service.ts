import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class DataSharingService {
  private messageSource = new Subject<string>();
  currentMessage = this.messageSource.asObservable();

  private errorSource = new Subject<string>();
  errorMessage = this.errorSource.asObservable();

  private eventEmit = new Subject<boolean>();
  eventEmitted = this.eventEmit.asObservable();

  private listEventEmit = new Subject<boolean>();
  listEventEmitted = this.listEventEmit.asObservable();

  private identityEventEmit = new Subject<string>();
  identityEventEmitted = this.identityEventEmit.asObservable();

  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message) 
  }

  errorChangeMessage(message: string) {
    this.errorSource.next(message) 
  }
  eventTrigger(message: boolean) {
    this.eventEmit.next(message)
  }

  listEventTrigger(message: boolean) {
    console.log('list event');
    this.listEventEmit.next(message)
  }

  changeIdentityEventTrigger(message: string) {
    console.log('list event');
    this.identityEventEmit.next(message)
  }
}
