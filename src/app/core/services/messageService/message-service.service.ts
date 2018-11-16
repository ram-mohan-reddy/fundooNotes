import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  
  messaging;
  // currentMessage = new BehaviorSubject(null)

  constructor() {firebase.initializeApp(
    {
      'messagingSenderId': '263147610417'
    });
    this.messaging = firebase.messaging();
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)
        localStorage.setItem('reminderToken',token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    receiveMessage() {
       this.messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        // this.currentMessage.next(payload)
      });

    }
}
