import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { HeroLandingComponent } from './features/hero-landing/hero-landing.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ClaimsComponent } from './features/claims/claims.component';
import { PoliciesComponent } from './features/policies/policies.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'claims', component: ClaimsComponent },
      { path: 'policies', component: PoliciesComponent },
      { path: '', redirectTo: 'claims', pathMatch: 'full' }, // Default child view
    ],
  },
  {
    path: '',
    component: HeroLandingComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
