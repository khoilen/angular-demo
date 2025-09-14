import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../types/doctor';
import { CommonModule } from '@angular/common';
import { DAY_OF_WEEK } from '../../constants/time';
import { TimeSlot } from '../../types/time-slot';
import { RelatedDoctors } from '../../components/related-doctors/related-doctors';

@Component({
  selector: 'app-appointment',
  imports: [CommonModule, RelatedDoctors],
  templateUrl: './appointment.html',
})
export class Appointment implements OnInit {
  docId!: string | null;
  docInfo: Doctor | null = null;
  docSlots: TimeSlot[][] = [];
  slotIndex = 0;
  slotTime = '';
  daysOfWeek = DAY_OF_WEEK;

  currencySymbol = '$';
  token: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.docId = this.route.snapshot.paramMap.get('docId');
    this.token = this.userService.getToken();
    this.fetchDocInfo();
  }

  fetchDocInfo() {
    this.doctorService.doctors$.subscribe((doctors) => {
      this.docInfo = doctors.find((doc) => doc._id === this.docId)!;

      if (this.docInfo) {
        this.docSlots = this.appointmentService.getAvailableSlots(this.docInfo);
      }
    });
  }

  bookAppointment() {
    if (!this.token) {
      this.toast.warning('Login to book appointment');
      this.router.navigate(['/login']);
      return;
    }

    const date = this.docSlots[this.slotIndex][0].datetime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    this.appointmentService
      .bookAppointment(this.docId!, slotDate, this.slotTime, this.token)
      .subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res);
            this.toast.success(res.message);
            this.doctorService.getDoctorsData();
            this.router.navigate(['/my-appointments']);
          } else {
            console.log(res);
            this.toast.error(res.message);
          }
        },
        error: (err) => {
          this.toast.error(err.message || 'Something went wrong');
        },
      });
  }
}
