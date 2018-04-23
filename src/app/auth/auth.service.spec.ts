import { TestBed, getTestBed, inject, async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Http, XHRBackend, Headers, Response, BaseRequestOptions, ResponseOptions, RequestMethod } from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule } from '@angular/http';
import { AuthService } from './auth.service';

describe('UserServiceTest', () => {
  let subject: AuthService = null;
  let backend: MockBackend = null;


  beforeEach(() => {
    // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
   //  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AuthService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
            }
         }
      ]
    });
  }); 
    beforeEach(inject([AuthService, MockBackend], (userService: AuthService, mockBackend: MockBackend) => {
      subject = userService;
      backend = mockBackend;
    }));


  it('signin should call endpoint and return it\'s result', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({status: 200})
      });
       let body = JSON.stringify({ email: 'example@gmail.com', password: 'secret' });
           let headers = new Headers({'Content-Type': 'application/json'});
           expect(connection.request.method).toEqual(RequestMethod.Post);
           expect(connection.request.url).toEqual('http://localhost:3000/user/signin', body);
           expect(connection.request.text()).toEqual(JSON.stringify({ email: 'example@gmail.com', password: 'secret' }));
           expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      connection.mockRespond(new Response(options));
    });

    subject
      .signin({ email: 'example@gmail.com', password: 'secret' })
      .subscribe((response: Response) => {
        //expect(response.json()).toEqual({ success: true });
        //console.log("lol3 "+ response.json());
        expect(response.status).toBe(200);
        done();
      });
  });
  it('signup should call endpoint and return it\'s result', (done) => {
    backend.connections.subscribe((connection: MockConnection) => {
      let options = new ResponseOptions({
        body: JSON.stringify({status: 200})
      });
        let body = JSON.stringify({ 
         email: 'example@gmail.com', 
         password: 'secret', 
         firstName: 'firstName', 
         lastName: 'lastName'  
        });
        let headers = new Headers({'Content-Type': 'application/json'});
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.url).toEqual('http://localhost:3000/user', body);
        expect(connection.request.text()).toEqual(JSON.stringify({
         email: 'example@gmail.com', 
         password: 'secret', 
         firstName: 'firstName', 
         lastName: 'lastName' 
        }));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');

      connection.mockRespond(new Response(options));
    });

    subject
      .signup({ 
         email: 'example@gmail.com', 
         password: 'secret', 
         firstName: 'firstName', 
         lastName: 'lastName'
      })
      .subscribe((response: Response) => {
        //expect(response.json()).toEqual({ success: true });
        //console.log("lol3 "+ response.json());
        expect(response.status).toBe(200);
        done();
      });
  });

}); 
  