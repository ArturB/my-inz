import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
@Component({
	selector: 'app-after-log',
	// templateUrl: './after-log.component.html',
	template: `	
		<app-loader></app-loader>
		<app-error></app-error>
		<app-header></app-header>
		<router-outlet></router-outlet>
	`,
	styles: ['']
	})
export class AfterLogComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
	}

}
