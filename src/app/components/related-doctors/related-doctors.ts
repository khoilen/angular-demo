import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../types/doctor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-related-doctors',
  imports: [CommonModule],
  templateUrl: './related-doctors.html',
})
export class RelatedDoctors implements OnInit {
  @Input() speciality!: string;
  @Input() docId!: string;

  relDoc: Doctor[] = [];

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this.doctorService.doctors$.subscribe((doctors) => {
      if (doctors.length > 0 && this.speciality) {
        this.relDoc = doctors.filter(
          (doc) => doc.speciality === this.speciality && doc._id !== this.docId
        );
      }
    });
  }

  goToDoctor(id: string) {
    this.router.navigate(['/appointment', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  goToDoctors() {
    this.router.navigate(['/doctors']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
