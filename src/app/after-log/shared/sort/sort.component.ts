import { Component, Input, Output, EventEmitter } from '@angular/core';
import {SortPipe} from './sort.pipe';
import {VideoService} from '../video.service';


@Component({
    selector: 'app-sort',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.css']
})
export class SortComponent{
	
    @Input() public sortBy: string;
    @Input() public sortOrder: string;

    @Output() sortByChange = new EventEmitter();
    @Output() sortOrderChange = new EventEmitter();

    constructor(private videoService: VideoService) {
    }

    changeSortBy(newSortBy) {
         this.sortBy = newSortBy;
         this.sortByChange.emit(newSortBy)
    }

    changeSortOrder(newSortOrder) {
         this.sortOrder = newSortOrder;
         this.sortOrderChange.emit(newSortOrder)
    } 
  
}