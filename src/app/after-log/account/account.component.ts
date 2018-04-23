import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../auth/user.model';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;

	constructor(private router: Router, private acountService: AccountService) { }

	ngOnInit() {
		  this.acountService.getProfile()
        .subscribe(user => { this.user = user; });
  }

  onLogout() {
      localStorage.clear();
      //this.router.navigate(['/auth', 'signin']);
  }

}
