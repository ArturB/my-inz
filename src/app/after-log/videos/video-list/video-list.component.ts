import { Component, OnInit, EventEmitter, Input, Output, DoCheck, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormControl } from '@angular/forms';

import { Video } from '../../shared/video.model';
import { VideoService} from '../../shared/video.service';

import { FilterComponent } from '../../shared/filter/filter.component';
import { FilterDateComponent } from '../../shared/filter-date/filter-date.component';

import { SortComponent } from '../../shared/sort/sort.component';

@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
	
    public videos: Video[];

    @Input() public filterText: string = "";

    public sortBy: string = "nth";
    public sortOrder: string = "asc";

    public isClassVisible = "";
    public isClassVisible2 = "activeNRec";
    public classCol = "col-lg-2 col-md-3 col-sm-4 col-xs-6";
      
    public videoName: string;
    public adds: any[] = [];
    public addTimer: any;

    @Input() public filterTextMin: string = "";
    @Input() public filterTextMax: string = "";

    public settOpen: boolean = false;

    public isSearchVisible: boolean = false;
    public isBtnShowMore: boolean = false;

    public showMore: number = 20;
    
  	constructor(private videoService: VideoService) {}

    ngOnInit() {
        this.videoService.getVideos()
          .subscribe(
           (videos: Video[]) => {
             this.videos = videos;

           }
          );
    }

    ngDoCheck() {
      if(this.videos){
        if(this.videos.length==1) {
              this.classCol = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
          }
        else if(this.videos.length==2) {
          if(this.isClassVisible == "activeNRec" && this.isClassVisible2 == "") {
            this.classCol = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
            }
          else {
            this.classCol = "col-lg-6 col-md-6 col-sm-6 col-xs-6";
            }
        }
        else if(this.videos.length==3) {
            if(this.isClassVisible == "activeNRec" && this.isClassVisible2 == "") {
              this.classCol = "col-lg-6 col-md-6 col-sm-6 col-xs-12";
            }
            else {
              this.classCol = "col-lg-4 col-md-4 col-sm-4 col-xs-6";
              }
          }
        else if(this.videos.length==4) {
            if(this.isClassVisible == "activeNRec" && this.isClassVisible2 == "") {
              this.classCol = "col-lg-6 col-md-6 col-sm-6 col-xs-12";
            }
            else {
              this.classCol = "col-lg-3 col-md-3 col-sm-3 col-xs-6";
              }
          }
      }

    }       

    setFour(){
        if(this.isClassVisible==""){
            this.classCol="col-lg-3 col-md-4 col-sm-6 col-xs-12";
            this.isClassVisible = "activeNRec";
            this.isClassVisible2 = "";
            
        }
    }	
    setSix(){
        if(this.isClassVisible2==""){
            this.classCol="col-lg-2 col-md-3 col-sm-4 col-xs-6";
            this.isClassVisible2 = "activeNRec";
            this.isClassVisible = "";


        }
        
    }    

    openInfAdd(value) {
        this.videoName = value;
        this.adds.push(value);
        
        this.addTimer = setTimeout(function() {
            let index: number = this.adds.indexOf(value);
            
            if (index !== -1) {
                this.adds.splice(index, 1);
            }
        }.bind(this), 4000);        
        
    } 

    filterChange(filter) {
        this.filterText = filter.filterText;
    }

    filterDMinChange(filterDMin) {
        this.filterTextMin = filterDMin.filterTextMin;
    }
    filterDMaxChange(filterDMax) {
        this.filterTextMax = filterDMax.filterTextMax;
    }

    showFilterDate($event) {
        this.settOpen = !this.settOpen;
        if (!this.settOpen) {
          this.filterText = "";
          this.filterTextMin = "";
          this.filterTextMax = "";
        }
        this.isSearchVisible = !this.isSearchVisible;
    }
	
}
