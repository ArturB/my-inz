import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {FilterPipe} from './filter.pipe';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {

	public enableFilter: boolean;
  	public filterText: string;
  	public filterPlaceholder: string;
	public filterInput = new FormControl();

	@Output() filterChange: EventEmitter<{filterText: string}> = new EventEmitter<{filterText: string}>();

	constructor() { }

	ngOnInit() {
	this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Cam...";
        
	this.filterInput
	  .valueChanges
	  .debounceTime(200)
	  .subscribe(term => {
	    this.filterText = term;
	    this.filterChange.emit({filterText: this.filterText});
	  });
	}
}