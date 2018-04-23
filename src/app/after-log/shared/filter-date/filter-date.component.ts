import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import {FilterDatePipe} from './filter-date.pipe';
import {FilterDateMaxPipe} from './filter-date-max.pipe';

@Component({
	selector: 'app-filter-date',
	templateUrl: './filter-date.component.html',
	styleUrls: ['./filter-date.component.css']
})

export class FilterDateComponent implements OnInit {
	public enableFilterMin: boolean;
    public filterTextMin: string;
    public filterPlaceholderMin: string;
    public filterInputMin = new FormControl();

    public enableFilterMax: boolean;
    public filterTextMax: string;
    public filterPlaceholderMax: string;
    public filterInputMax = new FormControl();

    @Output() filterDMinChange: EventEmitter<{filterTextMin: string}> = new EventEmitter<{filterTextMin: string}>();
	@Output() filterDMaxChange: EventEmitter<{filterTextMax: string}> = new EventEmitter<{filterTextMax: string}>();

	constructor() { }

	ngOnInit() {

	  this.enableFilterMin = true;
	  this.filterTextMin = "";
	  this.filterPlaceholderMin = "YYYY-MM-DD";

	  this.filterInputMin
	    .valueChanges
	    .debounceTime(200)
	    .subscribe(term => {
	      this.filterTextMin = term;
	      this.filterDMinChange.emit({filterTextMin: this.filterTextMin});
   		});

	  this.enableFilterMax = true;
	  this.filterTextMax = "";
	  this.filterPlaceholderMax = "YYYY-MM-DD";

	  this.filterInputMax
	    .valueChanges
	    .debounceTime(200)
	    .subscribe(term => {
	      this.filterTextMax = term;
	      this.filterDMaxChange.emit({filterTextMax: this.filterTextMax});
	    });
	}

}
