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

    const credentials = this.form.value; // define credentials

    this.auth.login(credentials).subscribe({
      next: (response) => {
        console.log('Login success:', response);
        localStorage.setItem('token', response.token); // store token
        this.router.navigate(['/profile']); // navigate after login
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });

    console.log('Form valid:', this.form.valid, this.form.value);
  }
}
