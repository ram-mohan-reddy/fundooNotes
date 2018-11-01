import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private messageSource = new Subject<string>();
  currentMessage = this.messageSource.asObservable();

  private eventEmit = new Subject<boolean>();
  eventEmitted = this.eventEmit.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  eventTrigger(message: boolean) {
    this.eventEmit.next(message)
  }
}
