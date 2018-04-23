import { Component } from '@angular/core';

@Component({
	selector: 'app-notfound',
	template: `
		<div class="notfound">
			<img id="imgNF" src="assets/notfound.png" alt="Strona nie została znaleziona">
			<h1>404</h1>
			<h2>Przepraszamy<br>Strona nie została znaleziona</h2>
			<h3>Aby przejść na stronę główną kliknuj <a routerLink="/">tutaj</a></h3>
		</div>
	`,
	styles: [`
		.notfound {
			text-align: center;
			margin: 0 18px;
			color: #f5e6d3;
		}
		h1 {
		    font-size: 70px;
		}
		h2 {
			text-transform: uppercase;

		}
		h3>a {
		    color: #bb7ea3;
			text-transform: none;

		}

		#imgNF {
			max-width: 240px;
			max-height: 240px;
			min-widh: 60px;
			margin-top: 40px;
		}
	`]
	})
export class NotfoundComponent {

	constructor() { }

}
