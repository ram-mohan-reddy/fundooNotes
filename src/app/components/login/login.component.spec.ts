import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create', () => { 
  //   expect(component).toBeTruthy();
  // });

  it('login', () => { 
    expect(component.userLogin.email).not.toBeNull();
    expect(component.userLogin.password).not.toBeNull(); 
    expect(component.userLogin.password).toBe.toString();
    expect(component.login).toBeTruthy();
  });
});
