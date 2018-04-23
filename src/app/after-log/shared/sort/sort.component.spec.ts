import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { SortComponent } from './sort.component';
import { VideoService } from '../video.service';
import { ErrorService } from "../../../errors/error.service";
import { LoaderService } from "../loader/loader.service";

import { AccountVideosService } from '../../account-videos/account-videos.service';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule],
      declarations: [ SortComponent ],
      providers: [
      	VideoService, 
      	AccountVideosService, 
      	ErrorService, 
      	LoaderService
  	  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
