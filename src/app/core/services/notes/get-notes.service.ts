import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service'; 



@Injectable({
  providedIn: 'root'
})

export class GetNotesService {
  constructor(private userService: HttpService) { 
  }
  getNotes() {
    return this.userService.getNotesList('api/notes/getNotesList')
  }
  notesPostService(url, noteDetails) {
    return this.userService.postServiceAuthentication(url,noteDetails)
  }

  notesPostCreate(url, noteDetails) {
    return this.userService.postServiceAuth(url,noteDetails)
  }
  notesUpdateService(url,updateData){
    return this.userService.resetPassword(url,updateData)
  }

  getLabelData(url){
   return this.userService.getNotesList(url)
  }

  deleteService(url) {
    return this.userService.delete(url)
  }

}
