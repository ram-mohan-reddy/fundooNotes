import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../core/services/questionService/question.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(private notesService: GetNotesService, private route: ActivatedRoute,
    private questionService: QuestionService) { }
    @ViewChild('addQuestion') newQuestion: ElementRef;
    @ViewChild('replyQuestion') replyQuestion: ElementRef;
    
  note: any;
  title: string = '';
  description: string = '';
  checkList = [];
  // newQuestion: string = '';
  questionAndAnswers = [];
  questionAsked: string = '';
  // replyAnswer: string = '';
  showReply: string = '';
  color: string = '';
  private savedUrl: string = '';
  private url: string = '';
  private firstName = '';
  private lastName = '';
  private server_url = environment.baseUrl;
  public user: string = '';
  panelOpenState = false;
  private rate: number;
  private rateAverage: number;
  private noteId: string = '';
  private replyShow: boolean = false;
  private showArrow:string='';
  private showArrowAnswers:string='';
  private showArrowNestedAnswers:string='';
  private replies:number;
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.noteId = params.id;
        this.getNoteDetails(params.id);
      }
    });
    this.user = localStorage.getItem('userId');
  }
  getNoteDetails(noteId) {
    this.notesService.getLabelData('api/notes/getNotesDetail/' + noteId)
      .subscribe(data => {
        this.note = data['data'].data[0];
        console.log(this.note);
        
        this.title = this.note.title;
        this.description = this.note.description;
        this.color = this.note.color;
        this.checkList = this.note.noteCheckLists;
        this.questionAndAnswers = this.note.questionAndAnswerNotes;
        if (this.questionAndAnswers.length != 0) {
          this.questionAsked = this.questionAndAnswers[0];
          this.firstName = this.note.questionAndAnswerNotes[0].user.firstName;
          this.lastName = this.note.questionAndAnswerNotes[0].user.lastName;
        }
      });
  }
  imageUrl(question) {
    this.savedUrl = question.user.imageUrl;
    this.url = this.server_url + this.savedUrl;
    return true;
  }
  onEnter() {
    let data = {
      "message": this.newQuestion.nativeElement.innerHTML,
      "notesId": this.note.id
    }
    this.newQuestion.nativeElement.innerHTML = '';
    this.questionService.addQuestion(data)
      .subscribe(data => {
        this.getNoteDetails(this.noteId);
      });
  }

  reply(parentId) {
    if (this.replyQuestion.nativeElement.innerHTML != '') {
      let data = {
        "message": this.replyQuestion.nativeElement.innerHTML
      }
      
      this.replyQuestion.nativeElement.innerHTML = '';
      this.questionService.reply(parentId, data)
        .subscribe(data => {
          this.getNoteDetails(this.noteId);
        })
    }
  }

  like(parentId) {
    let data = {
      "like": true
    }
    this.questionService.like(parentId, data)
      .subscribe(data => {
        this.getNoteDetails(this.noteId);
      })
  }

  rateQuestion(value, parentId) {
    let data = {
      "rate": value
    }
    this.questionService.rate(parentId, data)
      .subscribe(data => {
        this.getNoteDetails(this.noteId);
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
      this.rateAverage = (this.rateAverage + question.rate[index].rate) / question.rate.length;
      if (question.rate[index].userId == this.user) {
        this.rate = question.rate[index].rate;
        return true;
      }
    }
    this.rate = 0;
    return false;
  }
  replyCheck(questionAsked){
    this.replies = 0;
    for (let index = 0; index < this.questionAndAnswers.length; index++) {
      if (questionAsked.id == this.questionAndAnswers[index].parentId) {
        this.replies++;
      }
    }
    return this.replies;
  }
  @ViewChild('replyIdentity') replyIdentity: ElementRef;

  showFocus() {
    // this.replyIdentity.nativeElement.focus();
  }
}
