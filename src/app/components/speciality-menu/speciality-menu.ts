import { Component } from '@angular/core';
import { Router } from '@angular/router';

import specialityData from '../../data/speciality-data';

export interface Speciality {
  speciality: string;
  image: string;
}

@Component({
  selector: 'app-speciality-menu',
  imports: [],
  templateUrl: './speciality-menu.html',
})
export class SpecialityMenu {
  specialities: Speciality[] = specialityData;

  constructor(private router: Router) {}

  goToDoctor(speciality: string) {
    this.router.navigate(['/doctors', speciality]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
