import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent{
	public isMarginBottom: boolean = false;

	constructor() { }

	isMarginB() {
		this.isMarginBottom = !this.isMarginBottom
	}

}
