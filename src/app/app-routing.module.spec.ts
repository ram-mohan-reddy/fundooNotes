import { AppRoutingModule } from './app-routing.module';
import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";


describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;
  let location: Location;
  let router: Router;
  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });

  it('navigate to "" redirects you to /login', fakeAsync(() => { 
    router.navigate(['']); 
    tick(); 
    expect(location.path()).toBe('/login'); 
  }));

  it('navigate to "home" takes you to /home', fakeAsync(() => {
    router.navigate(['home']);
    tick();
    expect(location.path()).toBe('/home');
  }));
  
});
