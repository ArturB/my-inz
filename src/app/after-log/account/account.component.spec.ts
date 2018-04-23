import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { ErrorService } from "../../errors/error.service";

import { AccountService } from './account.service';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
	    HttpModule,
	    RouterTestingModule,
	  ],
	  declarations: [ AccountComponent ],
	  providers: [AccountService, ErrorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    //component.ngOnInit();
    fixture.detectChanges();
  });

});
