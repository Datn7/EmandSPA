import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-landing',
  imports: [],
  templateUrl: './hero-landing.component.html',
  styleUrl: './hero-landing.component.scss',
})
export class HeroLandingComponent {
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
