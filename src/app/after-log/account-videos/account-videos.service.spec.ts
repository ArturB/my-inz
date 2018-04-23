import { TestBed, getTestBed, inject, async } from '@angular/core/testing';
import { HttpModule, XHRBackend, Http, Headers, ResponseType, Response, BaseRequestOptions, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import { AccountVideosService } from './account-videos.service';
import { ErrorService } from "../../errors/error.service";
import { LoaderService } from "../shared/loader/loader.service";


class MockError extends Response implements Error {
  name:any
  message:any
}

describe('AccountVideosService', () => {
  let mockBackend: MockBackend;
  let subject: AccountVideosService = null;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AccountVideosService,
        ErrorService,
        LoaderService,
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

  beforeEach(inject([AccountVideosService, MockBackend], (service: AccountVideosService, mockBackend: MockBackend) => {
      subject = service;
      mockBackend = mockBackend;
    }));


  it('should get profile',
    async(inject([AccountVideosService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection: MockConnection) => {
      let options: any;

      const responseOptions: any = new ResponseOptions(options);

      if (responseOptions.status >= 200 && responseOptions.status <= 299) {
        expect(connection.request.method).toEqual(RequestMethod.Get);
            const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

            expect(connection.request.url).toEqual('http://localhost:3000/acvideos' + token);
            
            connection.mockRespond( new Response(responseOptions));
          }
          
      else{
            let opts = {type:ResponseType.Error, status:401, body:{ error: 'Some strange error' }};

            let responseOpts = new ResponseOptions(opts);
            connection.mockError(new MockError(responseOpts));
      }

    });

      spyOn(console, 'error');
      service.getAcVideos()
        .subscribe(res => {
          console.log(res);
            }, err => {
            console.error(err)
        });
        expect(console.error).toHaveBeenCalled();

    })));

  
});
