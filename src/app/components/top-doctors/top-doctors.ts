import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../types/doctor';

@Component({
  selector: 'app-top-doctors',
  imports: [CommonModule],
  templateUrl: './top-doctors.html',
})
export class TopDoctors {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.doctorService.doctors$.subscribe((docs) => {
      this.doctors = docs;
    });
  }

  goToDoctor(id: string) {
    this.router.navigate(['/appointment', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  goToDoctorsList() {
    this.router.navigate(['/doctors']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
