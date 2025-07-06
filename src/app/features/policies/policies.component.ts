import { Component, OnInit } from '@angular/core';
import { Policy } from '../../models/policy.model';
import { PoliciesService } from '../../core/services/policies.service';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policies',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent implements OnInit {
  policies: Policy[] = [];
  loading = false;

  constructor(
    private policiesService: PoliciesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.policiesService.getUserPolicies().subscribe({
      next: (data) => {
        this.policies = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }
}
