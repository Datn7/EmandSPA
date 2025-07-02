import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null; // at the top

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profilePictureUrl: [''],
      latitude: [null],
      longitude: [null],
    });
  }

  ngAfterViewInit(): void {
    const map = L.map('map').setView([41.7151, 44.8271], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    let marker: L.Marker;

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }

      this.form.patchValue({
        latitude: lat,
        longitude: lng,
      });
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        // Store the file for upload on submit, not now
        this.selectedFile = file;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Please complete all required fields.');
      return;
    }

    // Format date
    const rawDate = this.form.value.dateOfBirth;
    const formattedDate = new Date(rawDate).toISOString().split('T')[0];

    const proceedWithRegistration = (profilePictureUrl: string) => {
      const payload = {
        fullName: this.form.value.fullName,
        dateOfBirth: formattedDate,
        gender: this.form.value.gender,
        address: this.form.value.address,
        email: this.form.value.email,
        password: this.form.value.password,
        profilePictureUrl: profilePictureUrl,
        latitude: this.form.value.latitude,
        longitude: this.form.value.longitude,
      };

      console.log('Register payload:', payload);

      this.auth.register(payload).subscribe({
        next: () => {
          alert('Registration successful! Please login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration error:', err);
          alert(
            'Registration failed: ' +
              (err.error?.message ||
                JSON.stringify(err.error) ||
                err.statusText ||
                'Unknown error')
          );
        },
      });
    };

    if (this.selectedFile) {
      this.auth.uploadProfilePicture(this.selectedFile).subscribe({
        next: (res) => {
          proceedWithRegistration(res.url);
        },
        error: (err) => {
          console.error('Upload error:', err);
          alert('Failed to upload profile picture.');
        },
      });
    } else {
      proceedWithRegistration(''); // or a default image URL if your backend expects it
    }
  }
}
