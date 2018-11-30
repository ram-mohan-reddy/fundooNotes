import { Component, OnInit } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../core/services/questionService/question.service';
import{environment} from '../../../environments/environment'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private notesService:GetNotesService,private route: ActivatedRoute,
  private questionService:QuestionService) { }
  note:any;
  title:string ='';
  description:string ='';
  checkList=[];
  newQuestion:string='';
  questionAndAnswers=[];
  questionAsked: string = '';
  replyAnswer: string ='';
  showReply:string = '';
  color:string='';
  private savedUrl:string='';
  private url:string='';
  private firstName='';
  private lastName='';
  private server_url = environment.baseUrl;
  starList: boolean[] = [true,true,true,true,true]; 
  private user: string = '';
  panelOpenState = false;
  private rate : number;
  private rateAverage : number;
  ngOnInit() {
   
    this.route.params.subscribe(params => {
      if (params) {
        this.getNoteDetails(params.id);
      }
    });
this.user = localStorage.getItem('userId');
  }
  getNoteDetails(noteId) {
    this.notesService.getLabelData('api/notes/getNotesDetail/'+noteId)
    .subscribe(data => {
      // console.log(data['data'].data[0]);
      this.note = data['data'].data[0];
      console.log(this.note);
      this.title = this.note.title;
      this.description = this.note.description;
      this.color = this.note.color;
      this.checkList = this.note.noteCheckLists;
      this.questionAndAnswers = this.note.questionAndAnswerNotes;
      if (this.questionAndAnswers.length != 0) {
        this.questionAsked=this.questionAndAnswers[0];
        this.firstName= this.note.questionAndAnswerNotes[0].user.firstName;
        this.lastName= this.note.questionAndAnswerNotes[0].user.lastName;
        // this.savedUrl = this.note.questionAndAnswerNotes[0].user.imageUrl;
      }
     
      // this.url = this.server_url + this.savedUrl;
    });
  }
  imageUrl(question) {
    this.savedUrl = question.user.imageUrl;
    this.url = this.server_url + this.savedUrl;
    return true;
  }
  onEnter(newQuestion) {
    console.log(newQuestion);
    let data = {
      "message": this.newQuestion,
      "notesId": this.note.id
    }
    this.newQuestion = '';
    this.questionService.addQuestion(data)
    .subscribe(data=>{
      console.log(data);
    });
  }

  reply(parentId) {
    let data = {
      "message": this.replyAnswer
    }
    this.replyAnswer = '';
    this.questionService.reply(parentId, data)
      .subscribe(data => {
        console.log(data);
      })
  }

  like(parentId) {
    let data = {
      "like": true
    }
    this.questionService.like(parentId, data)
      .subscribe(data => {
        console.log(data);
      })
  }

  rateQuestion(value,parentId) {
    console.log(value);
    console.log(parentId);
    let data = {
      "rate": value
    }
    this.questionService.rate(parentId, data)
      .subscribe(data => {
        console.log(data);
      })
  }

  checkLike(question) {

    for (let index = 0; index < question.like.length; index++) {
      if (question.like[index].userId == this.user) {
        return true
      }
    }
    return false
  }

  checkRate(question) {
    this.rateAverage = 0;
    for (let index = 0; index < question.rate.length; index++) {
      this.rateAverage = (this.rateAverage + question.rate[index].rate)/question.rate.length;
      if (question.rate[index].userId == this.user) {
        this.rate = question.rate[index].rate;
        return true;
      }
    }
    this.rate = 0;
    return false;
  }


}
