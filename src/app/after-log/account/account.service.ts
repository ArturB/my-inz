import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx'; //to make map and other operators work
import {Observable} from 'rxjs';

import { User } from '../../auth/user.model';
import { ErrorService } from "../../errors/error.service";


@Injectable()
export class AccountService {
	user: User;

	constructor(private http: Http, private errorService: ErrorService) { }

	getProfile() {
        const token = localStorage.getItem('token')
			? '?token=' + localStorage.getItem('token')
			: '';

		return this.http.get('http://localhost:3000/profile' + token)

   		.map((response: Response) => {
                const user = response.json().obj;
                return user;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });

    }

}
