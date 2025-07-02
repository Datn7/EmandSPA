import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../models/user-profile.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userProfile?: UserProfile;
  loading = true;
  error?: string;
  private map: L.Map | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.loading = false;

        // Initialize the map only after userProfile is loaded:
        if (this.userProfile?.latitude && this.userProfile?.longitude) {
          setTimeout(() => {
            this.loadMap(
              Number(this.userProfile!.latitude),
              Number(this.userProfile!.longitude)
            );
          }, 0);
        }
      },
      error: (err) => {
        this.error = 'Failed to load profile. Please try again.';
        this.loading = false;
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // redirect to login after logout
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  private loadMap(lat: number, lng: number): void {
    this.map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`${this.userProfile?.fullName}'s Location`)
      .openPopup();
  }
}
