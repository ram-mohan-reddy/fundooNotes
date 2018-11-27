import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveIconComponent } from './archive-icon.component';

describe('ArchiveIconComponent', () => {
  let component: ArchiveIconComponent;
  let fixture: ComponentFixture<ArchiveIconComponent>;

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
  
  // it('raises the selected event when clicked', () => {
    
  //   const hero: Hero = { id: 42, name: 'Test' };
  //   comp.hero = hero;
  
  //   component.archiveEvent.subscribe(true => expect(true).toBe(true));
  //   component.archiveRequest();
  // });
});
