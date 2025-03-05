import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api/api.model';
import { UserProfile } from '../models/api/user.model';

@Injectable({providedIn: 'root'})
export class AuthApiService {
  private readonly _base = environment.API_DOMAIN;

  constructor(private readonly httpClient: HttpClient) {}

  public signup(data: {fullname: string, username: string, password: string}) {
    return this.httpClient.post<ApiResponse<UserProfile>>(this._base + '/api/auth/register', data);
  }

  public login(data: {username: string, password: string}) {
    return this.httpClient.post<ApiResponse<UserProfile>>(this._base + '/api/auth/login', data);
  }

  public getMe(id: string) {
    return this.httpClient.get<ApiResponse<never>>(this._base + '/api/auth/' + id);
  }

  public setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public logout(): void {
    localStorage.removeItem('authToken');
  }
}
