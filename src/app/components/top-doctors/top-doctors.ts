import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-doctors',
  imports: [CommonModule],
  templateUrl: './top-doctors.html',
})
export class TopDoctors {
  doctors: any[] = [];

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.appService.doctors$.subscribe((docs) => {
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
