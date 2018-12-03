import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveIconComponent } from './archive-icon.component';
import { GetNotesService } from '../../core/services/notes/get-notes.service';

describe('ArchiveIconComponent', () => {
  let component: ArchiveIconComponent;
  let fixture: ComponentFixture<ArchiveIconComponent>;
  let notesService: GetNotesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit archive event', (done) => {
    component.archiveEvent.subscribe(g => {
       expect(g).toEqual(true);
       done();
    }); 
  });

  it('should emit unarchive event', (done) => {
    component.unArchiveEvent.subscribe(g => {
       expect(g).toEqual(true);
       done();
    });
  });

  it("should emit archive event", async(() => {
    const response = {
      sucess : true
    };
    spyOn(notesService, 'notesPostService').and.returnValue(response.sucess.valueOf())
    component.archiveRequest();
    fixture.detectChanges();
    component.archiveEvent.subscribe(g => {
      expect(g).toEqual(true);
    });
  }));
  it("should emit unarchive event", async(() => {
    const response = {
      sucess : true
    };
    spyOn(notesService, 'notesPostService').and.returnValue(response.sucess.valueOf())
    component.unArchiveRequest();
    fixture.detectChanges();
    component.unArchiveEvent.subscribe(g => {
      expect(g).toEqual(true);
    });
  }));
});
