import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Api } from './api';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
  private api = inject(Api);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.api.baseUrl}auth/login`,
      credentials
    );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.api.baseUrl}auth/register`,
      userData
    );
  }
}
