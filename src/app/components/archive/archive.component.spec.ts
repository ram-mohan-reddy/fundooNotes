import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GetNotesService } from '../../core/services/notes/get-notes.service';
import { ArchiveComponent } from './archive.component';
import { Notes } from '../../core/models/notes';
import { of } from 'rxjs';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;
  let notesService: GetNotesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call getNotes and return list of notes", async(() => {
    const response: Notes[] = [];
    spyOn(notesService, 'getNotes').and.returnValue(of(response))
    component.getNotes();
    fixture.detectChanges();
    expect(component.totalNotes).toEqual(response);
  }));

  it("should call getNotes and return list of notes after receiving event", async(() => {
    const response: Notes[] = [];
    component.notesArchiveRequest(true);
    expect(component.totalNotes).toEqual(response);
    component.totalNotes = [];
    component.notesArchiveRequest(false);
    expect(component.totalNotes.length).toEqual(0);
  }));
});
