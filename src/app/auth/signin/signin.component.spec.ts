import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import {} from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from "../user.model";
import { Observable } from "rxjs";
//import {By} from '@angular/platform-browser';

import { AuthService } from '../auth.service';

import { SignInComponent } from './signin.component';

describe('Component: Login', () => {

  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterTestingModule,
      ],
      declarations: [
        SignInComponent
      ],
      providers: [
        AuthService
      ]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(SignInComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.myForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.myForm.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something correct
    email.setValue("example@gmail.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.myForm.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something correct
    password.setValue("secret");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a form emits a user', inject([AuthService], (service) => {
    //expect(component.myForm.valid).toBeFalsy();
    component.myForm.controls['email'].setValue("example@gmail.com");
    component.myForm.controls['password'].setValue("secret");
    expect(component.myForm.valid).toBeTruthy();

    //let user: User;
    // Subscribe to the Observable and store the user in a local variable.
    let user = new User(component.myForm.value.email, component.myForm.value.password);
    service.signin(user);


    // Trigger the login function
    component.login();
    localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjU5YTQ5ZjAyMTI3MGMzMjdmNDEwMTNlMyIsImZpcnN0TmFtZSI6IkRhcmlhIiwibGFzdE5hbWUiOiJLdWthcmVrYSIsInBhc3N3b3JkIjoiJDJhJDEwJHppQWV3UUJQaHByaTYzU0FPai9pay5mSzZHSVl1Z0JZTjczelhLajNOLkRMNjdLMFZMYXlPIiwiZW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsIl9fdiI6MCwiYWNWaWRlb3MiOltdfSwiaWF0IjoxNTAzOTYyOTY2LCJleHAiOjE1MDM5NzAxNjZ9.JsBmKzRR1LgK5Quj7O_K2QDvdbbQjmYLFNGzMxb8-sI");

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe("example@gmail.com");
    expect(user.password).toBe("secret");
  }));



});




