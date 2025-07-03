import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Claim } from '../../models/claim.model';

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  private apiUrl = `${environment.apiUrl}/claims`;

  constructor(private http: HttpClient) {}

  submitClaim(claim: Claim): Observable<any> {
    return this.http.post(`${this.apiUrl}`, claim);
  }

  getUserClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(`${this.apiUrl}/user`);
  }
}
