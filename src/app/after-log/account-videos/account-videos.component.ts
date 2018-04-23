import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { HeaderComponent } from '../header/header.component';
import { AcVideo } from './ac-video.model';
import { AccountVideosService } from './account-videos.service';
import { Video } from '../shared/video.model';
//import {VideoService} from '../shared/video.service';
import { VideosComponent } from '../videos/videos.component';

import { FilterComponent } from '../shared/filter/filter.component';
import { FilterDateComponent } from '../shared/filter-date/filter-date.component';

import { SortComponent } from '../shared/sort/sort.component';

@Component({
    selector: 'app-account-videos',
    templateUrl: './account-videos.component.html',
    styleUrls: ['../videos/videos.component.css', '../videos/video-list/video-list.component.css', './account-videos.component.css'],
    //providers: [VideoService]
    })
export class AccountVideosComponent implements OnInit {
   
    public videos: Video[];
    public acVideos: AcVideo[];
    @Input() video: Video;

    @Input() public filterText: string;

    public sortBy: string = "nth";
    public sortOrder: string = "asc";

    public isClassVisible = "";
    public isClassVisible2 = "activeNRec";
    public classCol = "col-lg-2 col-md-3 col-sm-4 col-xs-6";

    public removes:any[] = [];
    public videoName: string;

    @Input() public filterTextMin: string;
    @Input() public filterTextMax: string;

    public settOpen: boolean = false;

    public isSearchVisible: boolean = false;

    constructor(private acService: AccountVideosService,
     //private videoService: VideoService
     ) { 
   }

    ngOnInit() {
       this.acService.getAcVideos()
         .subscribe(
           (acVideos: AcVideo[]) => {
              this.acVideos = acVideos;
             
           }
         );     
    }

    ngDoCheck() {
      if(this.acVideos){
        if(this.acVideos.length==1) {
              this.classCol = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
          }
        else if(this.acVideos.length==2) {
          if(this.isClassVisible == "activeNRec" && this.isClassVisible2 == "") {
            this.classCol = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
            }
          else {
            this.classCol = "col-lg-6 col-md-6 col-sm-6 col-xs-6";
            }
        }
        else if(this.acVideos.length==3) {
            if(this.isClassVisible == "activeNRec" && this.isClassVisible2 == "") {
              this.classCol = "col-lg-6 col-md-6 col-sm-6 col-xs-12";
            }
            else {
              this.classCol = "col-lg-4 col-md-4 col-sm-4 col-xs-6";
              }
          }
        else if(this.acVideos.length==4) {
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

    openInfRemove(value) {
        this.videoName = value;
        this.removes.push(value);
        
        setTimeout(function() {
            let index: number = this.removes.indexOf(value);

            if (index !== -1) {
                this.removes.splice(index, 1);
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
