import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const AuthRoutes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
];

export const authRouting = RouterModule.forChild(AuthRoutes);