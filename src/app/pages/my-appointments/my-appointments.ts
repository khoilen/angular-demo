import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { MONTHS } from '../../constants/time';
import { UserService } from '../../services/user.service';
import { Appointment } from '../../types/appointment';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-my-appointments',
  imports: [CommonModule, Button],
  templateUrl: './my-appointments.html',
})
export class MyAppointments implements OnInit {
  appointments: Appointment[] = [];
  months = MONTHS;
  isLoadingCancel = signal(false);

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const token = this.userService.getToken();
    if (token) {
      this.appointmentService.getUserAppointments(token).subscribe();
      this.appointmentService.appointments$.subscribe((appointments) => {
        this.appointments = appointments;
        this.cd.markForCheck();
      });
    }
  }

  slotDateFormat(slotDate: string): string {
    const dateArray = slotDate.split('_');
    return dateArray[0] + ' ' + this.months[Number(dateArray[1])] + ' ' + dateArray[2];
  }

  cancelAppointment(id: string) {
    const token = this.userService.getToken()!;
    this.isLoadingCancel.set(true);
    this.appointmentService.cancelAppointment(token, id).subscribe(() => {
      this.doctorService.getDoctorsData();
      this.isLoadingCancel.set(false);
    });
  }
}
