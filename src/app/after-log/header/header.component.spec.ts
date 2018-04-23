import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location, CommonModule } from '@angular/common';
import { DebugElement  } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { VideosComponent } from '../videos/videos.component';
import { AccountVideosComponent } from '../account-videos/account-videos.component';

import { AccountComponent } from '../account/account.component';
import { AccountService } from '../account/account.service';
import { ErrorService } from "../../errors/error.service";

//import { DropdownDirective } from '../shared/dropdown.directive';
import { VideoListComponent } from '../videos/video-list//video-list.component';
import { VideoItemComponent } from '../videos/video-list/video-item/video-item.component';

import { InformAddComponent } from '../videos/inform-add/inform-add.component';

import { InformRemoveComponent } from '../account-videos/inform-remove/inform-remove.component';

import { FilterComponent } from '../shared/filter/filter.component';
import { FilterDateComponent } from '../shared/filter-date/filter-date.component';
import { SortComponent } from '../shared/sort/sort.component';

import { FilterPipe } from '../shared/filter/filter.pipe';
import { FilterDatePipe } from '../shared/filter-date/filter-date.pipe';
import { FilterDateMaxPipe } from '../shared/filter-date/filter-date-max.pipe';
import { SortPipe } from '../shared/sort/sort.pipe';

import { AccountVideosListComponent } from '../account-videos/account-videos-list/account-videos-list.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {path: '', redirectTo: 'home', pathMatch: 'full'},
          {path: 'my-videos', component: AccountVideosComponent},
          {path: 'home', component: VideosComponent}
        ])
      ],
      declarations: [ 
        HeaderComponent,
        AccountComponent, 
        VideosComponent,
        AccountVideosComponent,
        VideoListComponent,
        InformRemoveComponent,
        FilterComponent,
        FilterDateComponent,
        SortComponent,
        FilterPipe,
        FilterDatePipe,
        FilterDateMaxPipe,
        SortPipe,
        AccountVideosListComponent,
        VideoItemComponent,
        InformAddComponent
      ],
      providers: [
        AccountService,
        ErrorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to my-videos',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    let links = fixture.nativeElement.querySelectorAll('a');
    links[1].click();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/my-videos');
    });

  })));

  it('should go to home',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    let links = fixture.nativeElement.querySelectorAll('a');
    links[0].click();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/home');
    });

  })));

  it('should open Account',
    async(inject([Router, Location], (router: Router, location: Location) => {

    let fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();


    de = fixture.debugElement.query(By.css('.accountBtn'));
    el = de.nativeElement;
    el.click();
    fixture.whenStable().then(() => {
      //expect(location.path()).toBe('/home');
    });
  })));

  


});
