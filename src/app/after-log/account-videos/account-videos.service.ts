import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx'; //to make map and other operators work
import {Observable} from 'rxjs';

import { AcVideo } from './ac-video.model';
// import { Video } from '../shared/video.model';

import { ErrorService } from "../../errors/error.service";
import { LoaderService } from "../shared/loader/loader.service";

@Injectable()
export class AccountVideosService {
	acVideosChanged = new EventEmitter<AcVideo[]>();

	private acVideos: AcVideo[] = [];

	constructor(
		private http: Http,
		private errorService: ErrorService,
		private loaderService: LoaderService
	 	) { }

	getAcVideos() {
		this.showLoader();

		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';

		return this.http.get('http://localhost:3000/acvideos' + token)
			.map((response: Response) => {
				//call response.json to retrieve the data
				const acVideos = response.json().obj; //obj to ten który ustawiliśmy w server.js
				let transformedAcVideos: AcVideo[] = [];
				for(let acVideo of acVideos) {
					transformedAcVideos.push(new AcVideo(
						acVideo.videoName, 
						acVideo.videoDate, 
						acVideo.videoPath, 
						acVideo._id, acVideo.user._id)
					);
				}
				this.acVideos = transformedAcVideos;
				return transformedAcVideos;
			})
			.finally(() => {
                this.onEnd();
            })
			.catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

	}

	addVs(acVideo: AcVideo) {
		//body because we send data with this request
		const body = JSON.stringify(acVideo);
		//headers to let my backend know that we are getting json data
		const headers = new Headers({'Content-Type': 'application/json'})

		const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';

		return this.http.post('http://localhost:3000/acvideos' + token, body, {headers: headers})
			//map operator to transform the data we get back
			.map((response: Response) => {
                const result = response.json();
                const acVideo = new AcVideo(
                	result.obj.videoName, 
                	result.obj.videoDate, 
                	result.obj.videoPath, 
                	result.obj._id, 
                	result.obj.user._id);
                this.acVideos.push(acVideo);
                return acVideo;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });


	}

	removeFromAccount(acVideo: AcVideo) {
	    this.acVideos.splice(this.acVideos.indexOf(acVideo), 1);
	    const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';

        return this.http.delete('http://localhost:3000/acvideos/' + acVideo.videoId + token)
            .map((response: Response) => {
            	response.json(); 
            	return acVideo;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

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