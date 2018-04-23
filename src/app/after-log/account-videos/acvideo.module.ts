import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccountVideosComponent } from './account-videos.component';
import { AccountVideosListComponent } from './account-videos-list/account-videos-list.component';

//import { AccountVideosService } from './account-videos.service';

import { InformRemoveComponent } from './inform-remove/inform-remove.component';
import { SofModule } from '../shared/sof.module';


@NgModule({	
	declarations: [
	    AccountVideosComponent,
	    AccountVideosListComponent,
	    InformRemoveComponent	    
	],
	imports: [
		CommonModule, 
		RouterModule,
		FormsModule,
		SofModule
	],
	//providers: [AccountVideosService],
})

export class AcVideoModule { }


