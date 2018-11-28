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
  color:string='';
  private savedUrl:string='';
  private url:string='';
  private firstName='';
  private lastName='';
  private server_url = environment.baseUrl;
  starList: boolean[] = [true,true,true,true,true]; 

  ngOnInit() {
   
    this.route.params.subscribe(params => {
      if (params) {
        this.getNoteDetails(params.id);
      }
    });
  }

  rating:number;  
//Create a function which receives the value counting of stars click, 
//and according to that value we do change the value of that star in list.
setStar(data:any){
      this.rating=data+1;                               
      for(var i=0;i<=4;i++){  
        if(i<=data){  
          this.starList[i]=false;  
        }  
        else{  
          this.starList[i]=true;  
        }  
     }  
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
        this.questionAsked=this.questionAndAnswers[0].message;
        this.firstName= this.note.questionAndAnswerNotes[0].user.firstName;
        this.lastName= this.note.questionAndAnswerNotes[0].user.lastName;
        this.savedUrl = this.note.questionAndAnswerNotes[0].user.imageUrl;
      }
     
      this.url = this.server_url + this.savedUrl;
    });
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

}
