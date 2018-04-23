import { TestBed, getTestBed, inject, async } from '@angular/core/testing';
import { HttpModule, XHRBackend, Http, Headers, ResponseType, Response, BaseRequestOptions, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

import { ErrorService } from "../../errors/error.service";
import { LoaderService } from "./loader/loader.service";
import { AccountVideosService } from '../account-videos/account-videos.service';
import { Video } from './video.model';

import { VideoService } from './video.service';

class MockError extends Response implements Error {
  name:any
  message:any
}

describe('VideoService', () => {
  let mockBackend: MockBackend;
  let subject: VideoService = null;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        VideoService,
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

  beforeEach(inject([VideoService, MockBackend], (service: VideoService, mockBackend: MockBackend) => {
      subject = service;
      mockBackend = mockBackend;
    }));


  it('should get videos',
    async(inject([VideoService, MockBackend], (service, mockBackend) => {

      mockBackend.connections.subscribe((connection: MockConnection) => {
      let options: any;

      const responseOptions: any = new ResponseOptions(options);

      //const response: any = new Response(responseOptions);

      if (responseOptions.status >= 200 && responseOptions.status <= 299) {
            connection.mockRespond( new Response(responseOptions));
          }
          
      else{
            //let body = JSON.stringify({key:'val'});
            let opts = {type:ResponseType.Error, status:401, body:{ error: 'Some strange error' }};


            // connection.mockError(new MockError(new ResponseOptions({
            //     body: {},
            //     status: 401
            // })));

            let responseOpts = new ResponseOptions(opts);
            connection.mockError(new MockError(responseOpts));
      }

    });

      spyOn(console, 'error');
      service.getVideos()
        .subscribe(res => {
          console.log(res);
            }, err => {
            console.error(err)
        });
        expect(console.error).toHaveBeenCalled();

    })));

  
});