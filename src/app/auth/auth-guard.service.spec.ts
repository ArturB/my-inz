import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReflectiveInjector } from '@angular/core';
import { Router } from '@angular/router';
//import { Http } from "@angular/http";

import { AuthService } from './auth.service';

import { AuthGuard } from './auth-guard.service';

describe('AuthGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpModule],
      providers: [AuthGuard, AuthService]

    });
  });

  it('checks if a user is valid',

    // inject guard service and Router
    async(inject([AuthGuard, Router], (service, router) => {

      // add a spy
      spyOn(router, 'navigate');

      expect(service.canActivate()).toBeTruthy();

    })
  ));
});
