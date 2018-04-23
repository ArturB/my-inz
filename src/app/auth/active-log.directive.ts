import {Directive, HostListener, HostBinding} from '@angular/core';

@Directive({
	selector: '[appActiveLog]'
})

export class ActiveLogDirective {
	@HostBinding('class.activeLog') loadedLog = false;
	
	@HostListener('click') onSelectLog() {
		this.loadedLog = !this.loadedLog;
	}

}