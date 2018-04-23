import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { matchOtherValidator } from './password-validation';

import { User } from "../user.model";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../signin/signin.component.css', './signup.component.css']
})
export class SignUpComponent implements OnInit {
	public myForm: FormGroup;
    MesSuccess;
    TitleSuccess;
    MesError;
    success = false;
    displayEr = 'none';

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
		this.myForm = new FormGroup({
	        firstName: new FormControl(null, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(24),
                Validators.pattern("[A-Za-z'-]{2,24}")
                ]),
	        lastName: new FormControl(null, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(24),
                Validators.pattern("[A-Za-z'-]{2,24}")
                ]),
	        email: new FormControl(null, [
                Validators.required, 
                Validators.email
                ]),
            password: new FormControl(null, [
                Validators.minLength(6),
                Validators.maxLength(24),
                Validators.required
              ]),
	        ConfirmPassword: new FormControl(null, [
                Validators.required, 
                Validators.minLength(6),
                Validators.maxLength(24),
                matchOtherValidator('password')
                ])
	    });
	}
    
    logup() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            //we should subscribe to it, wich will now send a request and allows me to lesten to the data i get back
            .subscribe(
                data => {
                    if (!data.success) {
                        this.MesError = data.message;
                        this.displayEr = 'block';
                    }
                    else {
                        this.success = true;
                        this.MesSuccess = data.message;
                        this.TitleSuccess = data.title;
                        this.displayEr = 'none';
                        this.myForm.reset();
                    }
                    
                },
                error => console.error(error)
            );
    }

    onSuccessHandled() {
        this.success = false;        
        this.router.navigate(['/auth', 'signin']);
    }

}
