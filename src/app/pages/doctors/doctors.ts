import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { Doctor as DoctorModel } from '../../types/doctor';
import { DOCTOR_SPECIALITIES } from '../../constants/specialities';

@Component({
  selector: 'app-doctors',
  imports: [CommonModule],
  templateUrl: './doctors.html',
})
export class Doctors {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private appService = inject(AppService);

  doctors: DoctorModel[] = [];
  filterDoctors: DoctorModel[] = [];
  speciality: string | null = null;
  showFilter = false;
  specialities = DOCTOR_SPECIALITIES;

  ngOnInit(): void {
    this.appService.doctors$.subscribe((docs) => {
      this.doctors = docs;
      this.applyFilter();
    });

    this.route.paramMap.subscribe((param) => {
      this.speciality = param.get('speciality');
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.speciality) {
      this.filterDoctors = this.doctors.filter(
        (doc: DoctorModel) => doc.speciality === this.speciality
      );
    } else {
      this.filterDoctors = this.doctors;
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  navigateSpeciality(spec: string) {
    if (this.speciality === spec) {
      this.router.navigate(['/doctors']);
    } else {
      this.router.navigate(['/doctors', spec]);
    }
  }

  goToAppointment(id: string) {
    this.router.navigate(['/appointment', id]);
  }
}
