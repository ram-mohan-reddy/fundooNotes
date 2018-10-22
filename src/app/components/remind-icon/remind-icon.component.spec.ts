import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindIconComponent } from './remind-icon.component';

describe('RemindIconComponent', () => {
  let component: RemindIconComponent;
  let fixture: ComponentFixture<RemindIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
