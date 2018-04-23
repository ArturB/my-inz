import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@angular/material';

import { AccountVideosService } from '../account-videos/account-videos.service';

import { HeaderComponent } from '../header/header.component';

import { SortComponent } from './sort/sort.component';
import { SortPipe } from './sort/sort.pipe';

import { DropdownDirective } from './dropdown.directive';
import { AppRoutingModule } from '../../app-routing.module';
import { FilterComponent } from './filter/filter.component';
import { FilterPipe } from './filter/filter.pipe';
import { FilterDatePipe } from './filter-date/filter-date.pipe';
import { FilterDateMaxPipe } from './filter-date/filter-date-max.pipe';
import { FilterDateComponent } from './filter-date/filter-date.component';

import { AccountComponent } from '../account/account.component';
import { AccountService } from '../account/account.service';

import { ErrorComponent } from '../../errors/error.component';
import { ErrorService } from '../../errors/error.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';

@NgModule({
	declarations: [
	    HeaderComponent,
	    SortComponent,
	    SortPipe,
	    DropdownDirective,
		FilterComponent,
	    FilterPipe,
	    FilterDateComponent,
	    FilterDatePipe,
	    FilterDateMaxPipe,
	    ErrorComponent,
	    AccountComponent,
	    LoaderComponent	    
	],
	imports: [
		CommonModule, 
		FormsModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule
	],
  	exports: [
	    HeaderComponent,
	    SortComponent,
	    SortPipe,
	    DropdownDirective,
	    FilterComponent,
	    FilterPipe,
	    ReactiveFormsModule,
	    FilterDateComponent,
	    FilterDatePipe,
	    FilterDateMaxPipe,
	    ErrorComponent,
	    AccountComponent,
	    LoaderComponent	    
  	], 
  	providers: [
  		ErrorService,
  		AccountService, 
  		LoaderService,
  		AccountVideosService
  	],
})

export class SofModule { }

