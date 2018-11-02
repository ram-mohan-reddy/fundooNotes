import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLabelComponent } from './delete-label.component';

describe('DeleteLabelComponent', () => {
  let component: DeleteLabelComponent;
  let fixture: ComponentFixture<DeleteLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
