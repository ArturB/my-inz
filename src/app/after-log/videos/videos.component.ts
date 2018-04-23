import { Component } from '@angular/core';
import { Video } from '../shared/video.model';
//import {VideoService} from '../shared/video.service';

@Component({
	selector: 'app-videos',
	template: `
		<div class="my-container">	
			<section class="content-container">
				<app-video-list></app-video-list>
			</section>
		</div>
	`,
	styleUrls: ['./videos.component.css'],
	//providers: [VideoService]
})
export class VideosComponent{
	constructor() { }
	
}
