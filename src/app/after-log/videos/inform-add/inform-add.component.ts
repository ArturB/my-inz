import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-inform-add',
	templateUrl: './inform-add.component.html',
	styleUrls: ['./inform-add.component.css']
})
export class InformAddComponent{
    @Input() nameDef: string;
    @Input() addsDef: any[];

	constructor() { }

	hideInfAdd(value) {
		let index: number = this.addsDef.indexOf(value);

		if (index !== -1) {
		this.addsDef.splice(index, 1);
		}
	}
}