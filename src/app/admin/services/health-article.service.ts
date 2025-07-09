import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface HealthArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTimeMinutes: number;
  createdAt: string;
}

export interface CreateHealthArticle {
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTimeMinutes: number;
}

@Injectable({
  providedIn: 'root',
})
export class HealthArticleService {
  private baseUrl = environment.apiUrl + '/healtharticles';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<HealthArticle[]> {
    return this.http
      .get<HealthArticle[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getArticle(id: number): Observable<HealthArticle> {
    return this.http
      .get<HealthArticle>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createArticle(article: CreateHealthArticle): Observable<HealthArticle> {
    return this.http
      .post<HealthArticle>(this.baseUrl, article)
      .pipe(catchError(this.handleError));
  }

  updateArticle(id: number, article: CreateHealthArticle): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/${id}`, article)
      .pipe(catchError(this.handleError));
  }

  deleteArticle(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<{ imageUrl: string }>(
        `${environment.apiUrl}/uploads/article-image`,
        formData
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HealthArticleService error:', error);
    return throwError(
      () => new Error(error.error?.message || 'An error occurred.')
    );
  }
}
