import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
//import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';

import { FilterComponent } from './filter.component';

@Component({
  template: `
    <input type="text" [formControl]="filterInput"/>
  `
})
class FormControlComponent {
  filterInput: FormControl;
}

describe('FilterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    	imports: [
    		ReactiveFormsModule,
    		FormsModule
    	],
		declarations: [ FilterComponent, FormControlComponent ]
    })
    .compileComponents();
  }));

	it('should update the control with new input', () => {
	  const fixture = TestBed.createComponent(FormControlComponent);
	  const control = new FormControl('Cam 6');
	  fixture.componentInstance.filterInput = control;
	  fixture.detectChanges();

	  const input = fixture.debugElement.query(By.css('input'));
	  expect(input.nativeElement.value).toEqual('Cam 6');

	  //input.nativeElement.value = 'updated value';
	  //dispatchEvent(input.nativeElement, 'input');
	  let inputElement = input.nativeElement;
	  inputElement.value = 'Cam 2';
	  inputElement.dispatchEvent(new Event('input'));
	  expect(control.value).toEqual('Cam 2');
	});


});
