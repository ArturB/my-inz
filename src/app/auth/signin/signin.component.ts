import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
// import { AuthService } from "../../after-log/shared/auth.service";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit  {

    public myForm: FormGroup;
    public MesError;
    public display = 'none';

    constructor(private authService: AuthService, private router: Router) {
      const token = localStorage.getItem('token');
      if (token !== null) {
            this.router.navigate(['/']);
          }
    }

    ngOnInit() {
      this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
                ]),
            password: new FormControl(null, [
                Validators.required,              
                Validators.minLength(6),
                Validators.maxLength(24)
                ])
        });
    }

    login() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
          this.authService.signin(user)
              .subscribe(
                  data => {
                    if (!data.success) {
                        this.MesError = data.message;
                        console.log(data);
                        this.display = 'block';
                    }
                    else {
                      localStorage.setItem('token', data.token);
                      this.router.navigateByUrl('/');
                      }
                  },
                  error => {
                    console.error(error)}
              );
    }
}