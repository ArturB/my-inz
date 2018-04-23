import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AcVideo } from '../ac-video.model';
import {AccountVideosService} from '../account-videos.service';
import {VideoService} from '../../shared/video.service';

@Component({
	selector: 'app-account-videos-list',
	templateUrl: './account-videos-list.component.html',
	styleUrls: ['../../videos/video-list/video-item/video-item.component.css']

})
export class AccountVideosListComponent implements OnInit {
	@Input() acVideo: AcVideo;

    @Output() onOpenInfRemove: EventEmitter<string> = new EventEmitter();
	
	constructor(private acService: AccountVideosService) { }

	ngOnInit() {
	}

	removeVideo() {
		this.acService.removeFromAccount(this.acVideo)
			.subscribe(
				data => console.log("Sekwencja " + data.videoName +  " została usunięta z konta"),
				err => console.log(err)
			);
		this.onOpenInfRemove.emit(this.acVideo.videoName);
	}

}
