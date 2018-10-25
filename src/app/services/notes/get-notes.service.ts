import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';


@Injectable({
  providedIn: 'root'
})
export class GetNotesService {

  token: string = localStorage.getItem('token')
  constructor(private userService: HttpService) { }
  getNotes() {
    // this.token = localStorage.getItem('token')
   return  this.userService.getNotesList('api/notes/getNotesList', this.token)
  }

  deleteNotes(note){
return this.userService.deleteNote('api/notes/trashNotes',note,this.token)
  }

  saveNotes(newNote) {
return this.userService.saveNote('api/notes/addNotes', newNote,this.token)
  }

  colorChange(data){
    return this.userService.saveNote('api/notes/changesColorNotes', data,this.token)
  }
}
 