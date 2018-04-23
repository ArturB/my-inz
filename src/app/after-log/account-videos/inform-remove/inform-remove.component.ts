import { Component,Input } from '@angular/core';

@Component({
	selector: 'app-inform-remove',
	templateUrl: './inform-remove.component.html',
	styleUrls: ['../../videos/inform-add/inform-add.component.css']
})
export class InformRemoveComponent{
	@Input() nameDef: string;
    @Input() removesDef: any[];

	constructor() { }

	hideInfRemove(value) {
		let index: number = this.removesDef.indexOf(value);

		if (index !== -1) {
		this.removesDef.splice(index, 1);
		}
	}
}