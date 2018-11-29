import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service'; 

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private userService: HttpService) { }

  addQuestion(data){
    let url = 'api/questionAndAnswerNotes/addQuestionAndAnswer'
    return this.userService.postServiceAuthentication(url,data)
  }

  like(id,data){
    let url = 'api/questionAndAnswerNotes/like/'+id
    return this.userService.postServiceAuthentication(url,data)
  }

  rate(id,data){
    let url = 'api/questionAndAnswerNotes/rate/'+id
    return this.userService.postServiceAuthentication(url,data)
  }

  reply(id,data){
    let url = 'api/questionAndAnswerNotes/reply/'+id
    return this.userService.postServiceAuthentication(url,data)
  }
}
