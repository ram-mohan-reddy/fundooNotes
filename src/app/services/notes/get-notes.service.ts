import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';


@Injectable({
  providedIn: 'root'
})
export class GetNotesService {

  token: string = localStorage.getItem('token')
  constructor(private userService: HttpService) { }
  getNotes() {
    return this.userService.getNotesList('api/notes/getNotesList', this.token)
  }
  notesPostService(url, noteDetails) {
    return this.userService.postServiceAuthentication(url,noteDetails, this.token)
  }

  notesUpdateService(url,updateData){

    return this.userService.resetPassword(url,updateData,this.token)

  }

}
