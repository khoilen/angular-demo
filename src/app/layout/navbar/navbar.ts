import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../types/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
})
export class Navbar {
  isMenuOpen = false;
  user: User | null = null;
  router: Router = inject(Router);
  token: string | null = null;

  constructor(private userService: UserService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((data) => {
      this.user = data?.userData ?? null;
      this.cd.markForCheck();
    });

    this.userService.token$.subscribe((t) => {
      this.token = t;
      this.cd.markForCheck();
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.userService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
