import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';

import { AppComponent } from './app.component';

import { AfterLogComponent } from './after-log/after-log.component';
import { AuthComponent } from './auth/auth.component';
import { VideosComponent } from './after-log/videos/videos.component';
import { AccountVideosComponent } from './after-log/account-videos/account-videos.component';
import { AccountComponent } from './after-log/account/account.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { Router } from '@angular/router';

const appRoutes: Routes = [	
	{path: '', component: AfterLogComponent,
		children: [
			{path: '', redirectTo: 'home', pathMatch: 'full'},
			{path: 'my-videos', component: AccountVideosComponent},
			{path: 'home', component: VideosComponent}
		]
		, canActivate: [AuthGuard]
	},
	{path: 'auth', component: AuthComponent, loadChildren: './auth/auth.module#AuthModule'},
	{path: '**', component: NotfoundComponent}
]


@NgModule({
  imports: [ 
  	RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  	],
  exports: [ RouterModule ]

})


export class AppRoutingModule { }