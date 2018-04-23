import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Video } from '../../../shared/video.model';
import { VideoService } from '../../../shared/video.service';
//import { AcVideo } from '../../../account-videos/ac-video.model';

@Component({
	selector: 'app-video-item',
	templateUrl: './video-item.component.html',
	styleUrls: ['./video-item.component.css']
})
export class VideoItemComponent implements OnInit {

	@Input() video: Video;
	//@Input() acVideos: AcVideo;
    @Output() onOpenInfAdd: EventEmitter<string> = new EventEmitter();

	constructor(private videoService: VideoService) { }

	ngOnInit() {
	}

	addVideo() {
		this.videoService.addVToAccount(this.video);
		this.onOpenInfAdd.emit(this.video.videoName);
	}

}