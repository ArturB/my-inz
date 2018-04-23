import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InformRemoveComponent } from './inform-remove/inform-remove.component';

import { FilterComponent } from '../shared/filter/filter.component';
import { FilterDateComponent } from '../shared/filter-date/filter-date.component';
import { SortComponent } from '../shared/sort/sort.component';

import { FilterPipe } from '../shared/filter/filter.pipe';
import { FilterDatePipe } from '../shared/filter-date/filter-date.pipe';
import { FilterDateMaxPipe } from '../shared/filter-date/filter-date-max.pipe';
import { SortPipe } from '../shared/sort/sort.pipe';

import { AccountVideosListComponent } from './account-videos-list/account-videos-list.component';

import { ErrorService } from "../../errors/error.service";
import { LoaderService } from "../shared/loader/loader.service";

//import { VideoService} from '../../shared/video.service';
import { AccountVideosService } from './account-videos.service';

import { AccountVideosComponent } from './account-videos.component';

describe('AccountVideosComponent', () => {
  let component: AccountVideosComponent;
  let fixture: ComponentFixture<AccountVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
		imports: [
    		FormsModule,
			ReactiveFormsModule,
			HttpModule
    	],
		declarations: [ 
			AccountVideosComponent,
			AccountVideosListComponent, 
			InformRemoveComponent, 
			FilterComponent,
			FilterDateComponent,
			SortComponent,
			FilterPipe,
			FilterDatePipe,
			FilterDateMaxPipe,
			SortPipe
		],
		providers: [
			//VideoService,
			AccountVideosService,
			ErrorService,
			LoaderService
		]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
