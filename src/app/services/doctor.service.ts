import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Doctor } from '../types/doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorsSource = new BehaviorSubject<Doctor[]>([]);
  doctors$ = this.doctorsSource.asObservable();

  backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.getDoctorsData();
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
}
