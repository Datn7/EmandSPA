import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClaimsService } from '../../core/services/claims.service';
import { AuthService } from '../../core/services/auth.service';
import { Claim } from '../../models/claim.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./claims.component.scss'],
})
export class ClaimsComponent implements OnInit {
  claims: Claim[] = [];
  claimForm: FormGroup;
  loading = false;

  constructor(
    private claimsService: ClaimsService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.claimForm = this.fb.group({
      policyId: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.loading = true;
    this.claimsService.getClaimsByUser(userId).subscribe({
      next: (data) => {
        this.claims = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  submitClaim() {
    if (this.claimForm.invalid) return;

    const claim: Claim = this.claimForm.value;

    this.claimsService.submitClaim(claim).subscribe({
      next: (res) => {
        alert('Claim submitted successfully.');
        this.claimForm.reset();
        this.ngOnInit(); // refresh list
      },
      error: (err) => {
        console.error(err);
        alert('Error submitting claim.');
      },
    });
  }
}
