import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InformAddComponent } from './inform-add/inform-add.component';

import { FilterComponent } from '../shared/filter/filter.component';
import { FilterDateComponent } from '../shared/filter-date/filter-date.component';
import { SortComponent } from '../shared/sort/sort.component';

import { FilterPipe } from '../shared/filter/filter.pipe';
import { FilterDatePipe } from '../shared/filter-date/filter-date.pipe';
import { FilterDateMaxPipe } from '../shared/filter-date/filter-date-max.pipe';
import { SortPipe } from '../shared/sort/sort.pipe';

import { VideoItemComponent } from './video-list/video-item/video-item.component';

import { ErrorService } from "../../errors/error.service";
import { LoaderService } from "../shared/loader/loader.service";
import { AccountVideosService } from '../account-videos/account-videos.service';
import { VideoService} from '../shared/video.service';

import { VideoListComponent } from './video-list/video-list.component';

import { VideosComponent } from './videos.component';

describe('VideosComponent', () => {
  let component: VideosComponent;
  let fixture: ComponentFixture<VideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
    		FormsModule,
			ReactiveFormsModule,
			HttpModule
    	],
		declarations: [ 
			VideosComponent,
			VideoListComponent, 
			InformAddComponent, 
			FilterComponent,
			FilterDateComponent,
			SortComponent,
			FilterPipe,
			FilterDatePipe,
			FilterDateMaxPipe,
			SortPipe,
			VideoItemComponent,
		],
		providers: [
			VideoService,
			AccountVideosService,
			ErrorService,
			LoaderService
		]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
