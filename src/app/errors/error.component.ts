import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { Error } from "./error.model";
import { ErrorService } from "./error.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
    public error: Error;
    public display = 'none';

    constructor(private router: Router, private errorService: ErrorService) {}

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.errorService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    this.display = 'block';
                }
            );
    }

    onLogout() {
      localStorage.clear();
      //this.router.navigate(['/auth', 'signin']);
    }
}
