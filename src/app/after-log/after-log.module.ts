import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';

import { AfterLogComponent } from './after-log.component';

import { VideosComponent } from './videos/videos.component';
import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideoItemComponent } from './videos/video-list/video-item/video-item.component';
import { VideoService } from './shared/video.service';
import { InformAddComponent } from './videos/inform-add/inform-add.component';

import {SofModule} from './shared/sof.module';

@NgModule({	
	declarations: [
		AfterLogComponent,
	    VideosComponent,
	    VideoListComponent,
	    VideoItemComponent,
	    InformAddComponent    
	],
	imports: [
		CommonModule, 
		FormsModule,
		AppRoutingModule,
		SofModule
	],  	
  	providers: [VideoService],
})

export class AfterLogModule { }