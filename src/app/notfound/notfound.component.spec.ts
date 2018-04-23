import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location, CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { HeaderComponent } from '../after-log/header/header.component';
import { ErrorComponent } from '../errors/error.component';
import { LoaderComponent } from '../after-log/shared/loader/loader.component';
import { LoaderService } from '../after-log/shared/loader/loader.service';
import { AccountComponent } from '../after-log/account/account.component';
import { AccountService } from '../after-log/account/account.service';
import { ErrorService } from '../errors/error.service';

import { AfterLogComponent } from '../after-log/after-log.component';

import { VideoListComponent } from '../after-log/videos/video-list/video-list.component';
import { By } from '@angular/platform-browser';
import { VideosComponent } from '../after-log/videos/videos.component';
//import { AfterLogModule } from '../after-log/after-log.module';

import { NotfoundComponent } from './notfound.component';

describe('NotfoundComponent', () => {
  let component: NotfoundComponent;
  let fixture: ComponentFixture<NotfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      HttpModule,
      MaterialModule,
      RouterTestingModule.withRoutes([
          {path: '', component: AfterLogComponent}
        ])      
      ],
      declarations: [ 
        NotfoundComponent, 
       // VideosComponent,
       // VideoListComponent, 
        AfterLogComponent,
        HeaderComponent,
        ErrorComponent,
        LoaderComponent,
        AccountComponent
      ],
      providers: [
        LoaderService,
        ErrorService,
        AccountService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(NotfoundComponent);
    fixture.detectChanges();

    let links = fixture.nativeElement.querySelectorAll('a');
    links[0].click();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/');
    });

  })));

  // afterAll(() => {
  //   localStorage.clear(); 
  //   fixture.detectChanges();   
  //   let token = localStorage.getItem('token')
     
  //   expect(token).toBe(null);
  // });



});
