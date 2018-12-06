import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../core/services/questionService/question.service';
import { environment } from '../../../environments/environment';
import {Subject} from 'rxjs';
import{takeUntil} from 'rxjs/operators' 

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements  OnInit, OnDestroy {

  constructor(private notesService: GetNotesService, private route: ActivatedRoute,
    private questionService: QuestionService) { }
  @ViewChild('addQuestion') newQuestion: ElementRef;
  @ViewChild('replyQuestion') replyQuestion: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();
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
  public editorContent: string;
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 
                      'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 
                      'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 
                      'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 
                      'formatUL', 'outdent', 'indent', 'quote', 'fontAwesome', 
                      'specialCharacters', 'selectAll', 'clearFormatting',
                      'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
    toolbarButtonsXS:['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 
                      'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 
                      'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 
                      'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 
                      'formatUL', 'outdent', 'indent', 'quote', 'fontAwesome', 
                      'specialCharacters', 'selectAll', 'clearFormatting',
                      'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
    toolbarButtonsSM:['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 
                      'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 
                      'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 
                      'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 
                      'formatUL', 'outdent', 'indent', 'quote', 'fontAwesome', 
                      'specialCharacters', 'selectAll', 'clearFormatting',
                      'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
    toolbarButtonsMD:['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 
                      'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 
                      'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 
                      'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 
                      'formatUL', 'outdent', 'indent', 'quote', 'fontAwesome', 
                      'specialCharacters', 'selectAll', 'clearFormatting',
                      'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
  };
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
      .pipe(takeUntil(this.destroy$)) 
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
      "message": this.editorContent,
      "notesId": this.note.id
    }
    this.editorContent = '';
    this.questionService.addQuestion(data)
      .pipe(takeUntil(this.destroy$)) 
      .subscribe(data => {
        this.getNoteDetails(this.noteId);
      });
  }

  reply(parentId) {
    if (this.editorContent != '') {
      let data = {
        "message": this.editorContent
      }
      
      this.editorContent = '';
      this.questionService.reply(parentId, data)
        .pipe(takeUntil(this.destroy$)) 
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
      .pipe(takeUntil(this.destroy$)) 
      .subscribe(data => {
        this.getNoteDetails(this.noteId);
      })
  }

  rateQuestion(value, parentId) {
    let data = {
      "rate": value
    }
    this.questionService.rate(parentId, data)
      .pipe(takeUntil(this.destroy$)) 
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
 
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }   
}
