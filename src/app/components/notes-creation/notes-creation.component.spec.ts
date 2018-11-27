import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCreationComponent } from './notes-creation.component';

describe('NotesCreationComponent', () => {
  let component: NotesCreationComponent;
  let fixture: ComponentFixture<NotesCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesCreationComponent ]
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('note added successfully', () => {
    fixture.componentInstance.saveNote();
    expect(component.title).toBeGreaterThanOrEqual(1);
  });

  
});
