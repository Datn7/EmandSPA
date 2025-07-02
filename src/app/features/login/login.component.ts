import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        alert('Login successful!');
        this.router.navigate(['/dashboard']); // or your desired route
      },
      error: (err) => {
        console.error('Login error:', err);
        alert(
          'Login failed: ' +
            (err.error?.message ||
              JSON.stringify(err.error) ||
              err.statusText ||
              'Unknown error')
        );
      },
    });

    console.log('Form valid:', this.form.valid, this.form.value);
  }
}
