import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Provider {
  id: number;
  name: string;
  specialty: string;
  location: string;
  phone: string;
  inNetwork: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProvidersService {
  constructor() {}

  getProviders(): Observable<Provider[]> {
    // Mock data, replace with HTTP call later
    const mockProviders: Provider[] = [
      {
        id: 1,
        name: 'Dr. Alice Green',
        specialty: 'Family Medicine',
        location: 'New York, NY',
        phone: '555-1234',
        inNetwork: true,
      },
      {
        id: 2,
        name: 'Dr. Bob White',
        specialty: 'Cardiology',
        location: 'Boston, MA',
        phone: '555-5678',
        inNetwork: true,
      },
      {
        id: 3,
        name: 'Central Hospital',
        specialty: 'General Hospital',
        location: 'Los Angeles, CA',
        phone: '555-9012',
        inNetwork: false,
      },
    ];
    return of(mockProviders);
  }
}
