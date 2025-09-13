import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../types/user';

type LoginResponse = {
  success: boolean;
  token?: string;
  message?: string;
  [key: string]: unknown;
};

export type ProfileResponse = {
  success: boolean;
  userData?: User;
  message?: string;
  token?: string;
  [key: string]: unknown;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  backendUrl = environment.apiUrl;
  private userDataSource = new BehaviorSubject<ProfileResponse | null>(null);
  user$ = this.userDataSource.asObservable();

  private tokenSource = new BehaviorSubject<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );
  token$ = this.tokenSource.asObservable();

  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      this.tokenSource.next(token);
    }
    this.loadUserProfileData();
  }

  setToken(token: string | null) {
    if (this.isBrowser) {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
    this.tokenSource.next(token);
  }

  async register(name: string, email: string, password: string) {
    const res: LoginResponse = await firstValueFrom(
      this.http.post<LoginResponse>(`${this.backendUrl}/api/user/register`, {
        name,
        email,
        password,
      })
    );

    if (res.success) {
      this.setToken(res.token!);
      this.loadUserProfileData();
    }
    return res;
  }

  async login(email: string, password: string) {
    const res = await firstValueFrom(
      this.http.post<LoginResponse>(`${this.backendUrl}/api/user/login`, { email, password })
    );

    if (res.success) {
      this.setToken(res.token ?? null);
      this.loadUserProfileData();
    }
    return res;
  }

  loadUserProfileData() {
    const token = this.tokenSource.value;
    if (!token) return;

    const headers = new HttpHeaders({ token });
    this.http
      .get<ProfileResponse>(`${this.backendUrl}/api/user/get-profile`, { headers })
      .pipe(
        tap((res) => {
          if (res.success) {
            this.userDataSource.next({ success: true, userData: res.userData });
          }
        })
      )
      .subscribe();
  }

  async updateProfile(formData: FormData): Promise<ProfileResponse> {
    const token = this.getToken();
    if (!token) throw new Error('No token found');

    const headers = new HttpHeaders({ token });

    const res = await firstValueFrom(
      this.http.post<ProfileResponse>(`${this.backendUrl}/api/user/update-profile`, formData, {
        headers,
      })
    );

    if (res.success) {
      this.loadUserProfileData();
    }

    return res;
  }

  getToken(): string | null {
    return this.tokenSource.value;
  }

  logout() {
    this.setToken(null);
    this.userDataSource.next(null);
  }
}
