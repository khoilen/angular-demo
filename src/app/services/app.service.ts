import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Doctor } from '../types/doctor';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  currencySymbol = '$';
  backendUrl = environment.apiUrl;

  private doctorsSource = new BehaviorSubject<Doctor[]>([]);
  doctors$ = this.doctorsSource.asObservable();

  private userDataSource = new BehaviorSubject<any | null>(null);
  userData$ = this.userDataSource.asObservable();

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
    this.getDoctorsData();

    if (this.tokenSource.value) {
      this.loadUserProfileData();
    }
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

  getDoctorsData() {
    return this.http
      .get<any>(`${this.backendUrl}/api/doctor/list`)
      .pipe(
        tap((res) => {
          if (res.success) {
            this.doctorsSource.next(res.doctors);
          }
        })
      )
      .subscribe();
  }

  loadUserProfileData() {
    const token = this.tokenSource.value;
    if (!token) return;

    const headers = new HttpHeaders({ token });
    return this.http
      .get<any>(`${this.backendUrl}/api/user/get-profile`, { headers })
      .pipe(
        tap((res) => {
          if (res.success) {
            this.userDataSource.next(res.user);
          }
        })
      )
      .subscribe();
  }
}
