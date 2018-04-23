import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { ErrorComponent } from '../errors/error.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader/loader.service';
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/account.service';
import { ErrorService } from '../errors/error.service';

import { AfterLogComponent } from './after-log.component';

describe('AfterLogComponent', () => {
  let component: AfterLogComponent;
  let fixture: ComponentFixture<AfterLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
	  imports:[
	  	HttpModule,
	    RouterTestingModule,
	    MaterialModule
	  ],
	  declarations: [ 
		AfterLogComponent,
		HeaderComponent,
		ErrorComponent,
	  	LoaderComponent,
	  	AccountComponent
	  ],
	  providers: [
	  	LoaderService,
	  	ErrorService,
	  	AccountService
	  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
