import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ErrorService } from "../../../errors/error.service";
import { LoaderService } from "../../shared/loader/loader.service";

import { AccountVideosService } from '../account-videos.service';

import { AccountVideosListComponent } from './account-videos-list.component';

describe('AccountVideosListComponent', () => {
  let component: AccountVideosListComponent;
  let fixture: ComponentFixture<AccountVideosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [
    		HttpModule
    	],
		declarations: [ 
			AccountVideosListComponent 
		],
		providers: [
			AccountVideosService,
			ErrorService,
			LoaderService		
		]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountVideosListComponent);
    component = fixture.componentInstance;
    component.acVideo = {videoName: 'Cam 1', videoDate: '2017-12-22T08:04:08.179Z', videoPath: 'assets/video/Cam_6/Tramway.mp4'} // <-- this is required!
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
