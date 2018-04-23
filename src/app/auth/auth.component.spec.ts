import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SignInComponent } from './signin/signin.component';

import { SignUpComponent } from './signup/signup.component';
import { AuthService } from './auth.service';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: 'signin', pathMatch: 'full' },
          { path: 'signin', component: SignInComponent },
          { path: 'signup', component: SignUpComponent },
        ])
      ],
      declarations: [ AuthComponent, SignInComponent, SignUpComponent ],
      providers: [
      AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should go to signup',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges();

    let links = fixture.nativeElement.querySelectorAll('a');
    links[1].click();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/signup');
    });

  })));

  it('should go to signin',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(AuthComponent);
    fixture.detectChanges();

    let links = fixture.nativeElement.querySelectorAll('a');
    links[0].click();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/signin');
  });

  })));


});
