import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './auth-guard.service';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

import { ActiveLogDirective } from './active-log.directive';

import { authRouting } from "./auth-routing";

@NgModule({
	declarations: [
		AuthComponent,
		SignInComponent,
		SignUpComponent,
		ActiveLogDirective
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
    	authRouting	
	],
	providers: [
		AuthGuard,
		AuthService
	],

})
export class AuthModule { }
