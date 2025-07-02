import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { HeroLandingComponent } from './features/hero-landing/hero-landing.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '', component: HeroLandingComponent },
  {
    path: '**',
    redirectTo: '/',
  },
];
