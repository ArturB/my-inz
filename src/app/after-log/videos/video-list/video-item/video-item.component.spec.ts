import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import { ErrorService } from "../../../../errors/error.service";

import { LoaderService } from "../../../shared/loader/loader.service";
import { AccountVideosService } from '../../../account-videos/account-videos.service';
import { VideoService } from '../../../shared/video.service';

import { Video } from '../../../shared/video.model';
import { AfterLogModule } from '../../../after-log.module';
import { VideoItemComponent } from './video-item.component';



  @Component({
	  template: `
	    <div class="video">
			<div class="video-caption">
			    <p class="caption">{{video.videoName}}</p>
			    <div class="rightstr">
			        <p class="caption">{{video.videoDate | date:'yyyy-MM-dd'}}</p>
			    </div>
			    <span class="video-top-buttons">
			        <button type="submit" (click)="addVideo()" title="Dodaj do konta">            
			            <span class="glyphicon glyphicon-plus"></span>
			        </button>             
			    </span>
			</div>
			<div class="movie">
			    <div class="embed-responsive embed-responsive-16by9 sekwencja"
			    >        
			        <video appVideoControls class="embed-responsive-item"
			        autoplay       
			        controls
			        #videoPath>        
			            <source
			            [src]="video.videoPath" 
			            type="video/mp4">	
			        </video>
			    </div>
			</div>
		</div>
	    `
	})
	class TestVideoItemComponent {
	  video = new Video('Cam 1', '2017-12-22T08:04:08.179Z', 'assets/video/Cam_6/Tramway.mp4');
	}



describe('VideoItemComponent', () => {
  let component: TestVideoItemComponent;
  let fixture: ComponentFixture<TestVideoItemComponent>;
  let videoEl: DebugElement;
  //let videoEl: HTMLElement;
  let expectedVideo: Video;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
    	imports: [
    		HttpModule,
    	],
		declarations: [ 
			VideoItemComponent,
			TestVideoItemComponent 
		],
		providers: [
			AccountVideosService,
			ErrorService,
			LoaderService,
			VideoService,
			DatePipe			
		]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestVideoItemComponent);
    component = fixture.componentInstance;
    videoEl  = fixture.debugElement.query(By.css('.video'));
  	fixture.detectChanges();
  });

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display video date', inject([DatePipe], (datePipe) => {
		const expectedPipedName = datePipe.transform(component.video.videoDate, 'yyyy-MM-dd');
		expect(videoEl.nativeElement.textContent).toContain(expectedPipedName);
		console.log("video " + expectedPipedName);
	}));
});
