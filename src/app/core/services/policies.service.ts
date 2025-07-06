import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../../models/policy.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PoliciesService {
  private apiUrl = `${environment.apiUrl}/policies`;

  constructor(private http: HttpClient) {}

  getUserPolicies() {
    return this.http.get<Policy[]>(this.apiUrl + '/user');
  }
}
