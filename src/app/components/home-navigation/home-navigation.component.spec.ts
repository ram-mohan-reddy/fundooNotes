
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeNavigationComponent } from './home-navigation.component';

describe('HomeNavigationComponent', () => {
  let component: HomeNavigationComponent;
  let fixture: ComponentFixture<HomeNavigationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [HomeNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
