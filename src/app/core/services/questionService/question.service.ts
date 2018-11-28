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
}
