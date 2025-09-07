import { Component } from '@angular/core';
import { Router } from '@angular/router';

import data from './data.json';
import { CommonModule } from '@angular/common';

export interface Specialty {
  specialty: string;
  image: string;
}

@Component({
  selector: 'app-specialty-menu',
  imports: [CommonModule],
  templateUrl: './specialty-menu.html',
})
export class SpecialtyMenu {
  specialties: Specialty[] = data;

  constructor(private router: Router) {}

  goToDoctor(specialty: string) {
    this.router.navigate(['/doctors', specialty]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
