import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  imports: [],
  templateUrl: './banner.html',
})
export class Banner {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
