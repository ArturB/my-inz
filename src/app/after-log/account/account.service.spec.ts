import { TestBed, getTestBed, inject, async } from '@angular/core/testing';
import { HttpModule, XHRBackend, Http, Headers, ResponseType, Response, BaseRequestOptions, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import { AccountService } from './account.service';
import { ErrorService } from "../../errors/error.service";


class MockError extends Response implements Error {
  name:any
  message:any
}

describe('AccountService', () => {
  let mockBackend: MockBackend;
  let subject: AccountService = null;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AccountService,
        ErrorService,
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

    mockBackend = getTestBed().get(MockBackend);

  });

  beforeEach(inject([AccountService, MockBackend], (service: AccountService, mockBackend: MockBackend) => {
      subject = service;
      mockBackend = mockBackend;
    }));


  it('should get profile',
    async(inject([AccountService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection: MockConnection) => {
      let options: any;

      const responseOptions: any = new ResponseOptions(options);

      if (responseOptions.status >= 200 && responseOptions.status <= 299) {
        expect(connection.request.method).toEqual(RequestMethod.Get);
            const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

            expect(connection.request.url).toEqual('http://localhost:3000/profile' + token);
            

            expect(service.getProfile({ firstName: 'firstName',  lastName: 'lastName',email: 'example@gmail.com'})).toBeTruthy();
            connection.mockRespond( new Response(responseOptions));
          }
          
      else{
            let opts = {type:ResponseType.Error, status:401, body:{ error: 'Some strange error' }};

            let responseOpts = new ResponseOptions(opts);
            connection.mockError(new MockError(responseOpts));
      }

    });

      spyOn(console, 'error');
      service.getProfile()
        .subscribe(res => {
          console.log(res);
            }, err => {
            console.error(err)
        });
        expect(console.error).toHaveBeenCalled();

    })));

  
});
