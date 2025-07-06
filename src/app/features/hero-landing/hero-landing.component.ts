import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdsSectionComponent } from '../ads-section/ads-section.component';

@Component({
  selector: 'app-hero-landing',
  imports: [AdsSectionComponent],
  standalone: true,
  templateUrl: './hero-landing.component.html',
  styleUrl: './hero-landing.component.scss',
})
export class HeroLandingComponent {
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
