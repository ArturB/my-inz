import { Injectable, EventEmitter, Output, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'; //to make map and other operators work

import { Video } from './video.model';
import { AcVideo } from '../account-videos/ac-video.model';

import { AccountVideosService } from '../account-videos/account-videos.service';
import { ErrorService } from "../../errors/error.service";

import { LoaderService } from "./loader/loader.service";

@Injectable()
export class VideoService {
	
	private videos: Video[] = [];

	constructor(
		private acService: AccountVideosService,
		private http: Http,
		private errorService: ErrorService,
		private loaderService: LoaderService
		) { }


	getVideos() {
		this.showLoader();

		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';

		return this.http.get('http://localhost:3000/videos' + token)
			.map((response: Response) => {
				//call response.jason to retrieve the data
				const videos = response.json().obj; //obj to ten który ustawiliśmy w server.js
				let transformedVideos: Video[] = [];
				for(let video of videos) {
					transformedVideos.push(new Video(
						video.videoName, 
						video.videoDate, 
						video.videoPath, 
						video._id)
					);
				}
				this.videos = transformedVideos;

				// console.log('request success');
				return transformedVideos;
			})
			.finally(() => {
                this.onEnd();
            })
			.catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
	}

	addVToAccount(acVideos: AcVideo) {
		this.acService.addVs(acVideos)
		.subscribe(
			data => console.log("Sekwencja " + data.videoName +  " została dodana z konta"),
			err => console.log(err)
		);
	}

	private onEnd(): void {
        this.hideLoader();
	}

	private showLoader(): void {
		this.loaderService.show();
    }

	private hideLoader(): void {
		this.loaderService.hide();
    }



}