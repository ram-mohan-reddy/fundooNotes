import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service'; 



@Injectable({
  providedIn: 'root'
})

export class GetNotesService {
  token: string
  constructor(private userService: HttpService) { 
    this.token = localStorage.getItem('token')
  }
  getNotes() {
    this.token = localStorage.getItem('token')
    return this.userService.getNotesList('api/notes/getNotesList', this.token)
  }
  notesPostService(url, noteDetails) {
    this.token = localStorage.getItem('token')
    return this.userService.postServiceAuthentication(url,noteDetails, this.token)
  }

  notesPostCreate(url, noteDetails) {
    this.token = localStorage.getItem('token')
    return this.userService.postServiceAuth(url,noteDetails, this.token)
  }
  notesUpdateService(url,updateData){
    this.token = localStorage.getItem('token')
    return this.userService.resetPassword(url,updateData,this.token)
  }

  getLabelData(url){
    this.token = localStorage.getItem('token')
   return this.userService.getNotesList(url,this.token)
  }

}
