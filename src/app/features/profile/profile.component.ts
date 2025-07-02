import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../models/user-profile.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.loading = false;
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
}
