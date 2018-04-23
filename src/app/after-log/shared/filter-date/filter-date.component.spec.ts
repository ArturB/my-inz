
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
//import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';

import { FilterDateComponent } from './filter-date.component';

@Component({
  template: `
    <input type="text" id="searchFormDMin" [formControl]="filterInputMin"/>
  `
})
class FormControlComponent {
  filterInputMin: FormControl;
}

describe('FilterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    	imports: [
    		ReactiveFormsModule,
    		FormsModule
    	],
		declarations: [ FilterDateComponent, FormControlComponent ]
    })
    .compileComponents();
  }));

	it('should update the control with new input', () => {
	  const fixture = TestBed.createComponent(FormControlComponent);
	  const control = new FormControl('Cam 6');
	  fixture.componentInstance.filterInputMin = control;
	  fixture.detectChanges();

	  const input = fixture.debugElement.query(By.css('#searchFormDMin'));
	  expect(input.nativeElement.value).toEqual('Cam 6');

	  //input.nativeElement.value = 'updated value';
	  //dispatchEvent(input.nativeElement, 'input');
	  let inputElement = input.nativeElement;
	  inputElement.value = 'Cam 2';
	  inputElement.dispatchEvent(new Event('input'));
	  expect(control.value).toEqual('Cam 2');
	});


});
