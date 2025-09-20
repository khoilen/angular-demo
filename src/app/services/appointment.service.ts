import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TimeSlot } from '../types/time-slot';
import { Appointment } from '../types/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private backendUrl = environment.apiUrl;

  private appointments = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.appointments.asObservable();
  constructor(private http: HttpClient) {}

  getAvailableSlots(docInfo: any): TimeSlot[][] {
    const docSlots: TimeSlot[][] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots: TimeSlot[] = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      docSlots.push(timeSlots);
    }

    return docSlots.filter((slots) => slots.length > 0);
  }

  bookAppointment(
    docId: string,
    slotDate: string,
    slotTime: string,
    token: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.backendUrl}/api/user/book-appointment`,
      { docId, slotDate, slotTime },
      { headers: { token } }
    );
  }

  getUserAppointments(token: string) {
    const headers = new HttpHeaders({ token });

    return this.http
      .get<{
        success: boolean;
        appointments: Appointment[];
      }>(`${this.backendUrl}/api/user/appointments`, { headers })
      .pipe(
        tap((res) => {
          if (res.success) {
            this.appointments.next([...res.appointments].reverse());
          }
        }),
        catchError((err) => throwError(() => err))
      );
  }

  cancelAppointment(token: string, appointmentId: string) {
    const headers = new HttpHeaders({ token });

    return this.http
      .post<any>(`${this.backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers })
      .pipe(
        tap((res) => {
          if (res.success) {
            this.getUserAppointments(token).subscribe();
          }
        }),
        catchError((err) => throwError(() => err))
      );
  }
}
