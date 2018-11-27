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

  it('login', () => { 
    component.login();
    component.userLogin = {
      email: "ram.mohan10595@gmail.com",
      password:"789632145"
    };
    expect(component.userLogin.email).toBeDefined();
    expect(component.userLogin.password).toBeDefined(); 
    expect(component.userLogin.password).toBe.toString();
    expect(component.userLogin.password.length).toBeGreaterThanOrEqual(5);
    expect(component.userLogin.email).toBe("ram.mohan10595@gmail.com");
    expect(component.userLogin.password).toBe("789632145");
  });
});
