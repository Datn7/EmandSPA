import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../models/user-profile.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements AfterViewChecked {
  userProfile?: UserProfile;
  loading = true;
  error?: string;
  private map?: L.Map;
  private mapInitialized = false;

  @ViewChild('mapContainer') mapContainer?: ElementRef<HTMLDivElement>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.loading = false;
        // Do NOT call loadMap here.
      },
      error: (err) => {
        this.error = 'Failed to load profile. Please try again.';
        this.loading = false;
      },
    });
  }

  ngAfterViewChecked(): void {
    if (
      !this.mapInitialized &&
      this.mapContainer &&
      this.userProfile?.latitude !== undefined &&
      this.userProfile?.longitude !== undefined
    ) {
      this.loadMap(this.userProfile.latitude, this.userProfile.longitude);
      this.mapInitialized = true;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  private loadMap(lat: number, lng: number): void {
    if (this.map) {
      this.map.remove();
    }

    const container = this.mapContainer?.nativeElement;
    if (!container) {
      console.error('Map container not found.');
      return;
    }

    this.map = L.map(container).setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    const customIcon = L.icon({
      iconRetinaUrl: 'https://localhost:7174/leaflet/marker-icon-2x.png',
      iconUrl: 'https://localhost:7174/leaflet/marker-icon.png',
      shadowUrl: 'https://localhost:7174/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([lat, lng], { icon: customIcon })
      .addTo(this.map)
      .bindPopup(`${this.userProfile?.fullName ?? 'User'}'s Location`)
      .openPopup();
  }
}
