import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import {} from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from "../user.model";
import { Observable } from "rxjs";
//import {By} from '@angular/platform-browser';

import { AuthService } from '../auth.service';

import { SignUpComponent } from './signup.component';

describe('Component: Logup', () => {

  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpModule,
        RouterTestingModule,
      ],
      declarations: [
        SignUpComponent
      ],
      providers: [
        AuthService
      ]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(SignUpComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.myForm.valid).toBeFalsy();
  });

  it('firstName field validity', () => {
    let errors = {};
    let firstName = component.myForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    // Email field is required
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something correct
    firstName.setValue("firstName");
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('lastName field validity', () => {
    let errors = {};
    let lastName = component.myForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    // Email field is required
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something correct
    lastName.setValue("lastName");
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
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
    expect(errors['email']).toBeFalsy();
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
    expect(errors['maxlength']).toBeFalsy();
  });
  
  it('ConfirmPassword field validity', () => {
    let errors = {};
    let ConfirmPassword = component.myForm.controls['ConfirmPassword'];

    // Email field is required
    errors = ConfirmPassword.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something correct
    ConfirmPassword.setValue("secret");
    errors = ConfirmPassword.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
    expect(errors['maxlength']).toBeFalsy();
  });

  it('submitting a register form', inject([AuthService], (service) => {
    //expect(component.myForm.valid).toBeFalsy();
    component.myForm.controls['firstName'].setValue("firstName");
    component.myForm.controls['lastName'].setValue("lastName");
    component.myForm.controls['email'].setValue("example@gmail.com");
    component.myForm.controls['password'].setValue("secret");
    component.myForm.controls['ConfirmPassword'].setValue("secret");
    expect(component.myForm.valid).toBeTruthy();

    //let user: User;
    // Subscribe to the Observable and store the user in a local variable.
    let user = new User(      
      component.myForm.controls['email'].value,
      component.myForm.controls['password'].value,
      component.myForm.controls['firstName'].value,
      component.myForm.controls['lastName'].value
    );
    service.signup(user);


    // Trigger the logup function
    component.logup();

    // Now we can check to make sure the emitted value is correct
    expect(user.firstName).toBe("firstName");
    expect(user.lastName).toBe("lastName");
    expect(user.email).toBe("example@gmail.com");
    expect(user.password).toBe("secret");
  }));



});




