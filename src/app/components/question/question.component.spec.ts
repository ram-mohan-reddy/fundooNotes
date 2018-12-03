import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';
import { Notes } from '../../core/models/notes';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  it('should return true when there is a like by user', () => {
    let likeArray = [{
      like : true,
      userId:localStorage.getItem('userId')
    }]
    let question = {
      like : likeArray
    }
    expect(component.checkLike(question)).toBeTruthy();
  });

  it('should return false when there is a no like by user', () => {
    let likeArray = [{
      like : true,
      userId:"5bc0287b5414a900407e8e59"
    }]
    let question = {
      like : likeArray
    }
    expect(component.checkLike(question)).toBeFalsy();
  });
  
  it('should return true when there is a rating given by user', () => {
    let rateArray = [{
      rate : 4,
      userId:localStorage.getItem('userId')
    }]
    let question = {
      rate : rateArray
    }
    expect(component.checkRate(question)).toBeTruthy();
  });

  it('should return false when there is a no rating given by user', () => {
    let rateArray = [{
      rate : 3,
      userId:"5bc0287b5414a900407e8e59"
    }]
    let question = {
      rate : rateArray
    }
    expect(component.checkRate(question)).toBeFalsy();
  });

  it("should call getNotesDetails and assign it to note", async(() => {
    const response: Notes[]=[];
    let noteId:string="5c011461019ffc00400b0e75"
    component.getNoteDetails(noteId);
    expect(component.note).toEqual(response);
  }));

  it("should call getNotesDetails and assign it to note in ngOnInIt", async(() => {
    const response: Notes[] = [];
    const user:string=localStorage.getItem('userId')
    component.ngOnInit();
    expect(component.note).toEqual(response);
    expect(component.user).toEqual(user);
  }));

  it('should return true when there is image url', () => {
  
    let user = {
     
      imageUrl:"images/1543497799459blob"
    }
    let question = {
      user : user
    }
    expect(component.checkRate(question)).toBeTruthy();
  });


  it('should return false when there is no image url', () => {
    let user = {
      imageUrl:""
    }
    let question = {
      user : user
    }
    expect(component.checkRate(question)).toBeFalsy();
  });

});

