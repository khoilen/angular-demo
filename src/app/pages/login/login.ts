import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
})
export class Login {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  state = signal<'Sign Up' | 'Login'>('Sign Up');

  constructor(private toast: ToastService) {}

  name = '';
  email = '';
  password = '';

  ngOnInit(): void {
    if (this.userService.getToken()) {
      this.router.navigate(['/']);
    }
  }
  async onSubmitHandler(event: Event) {
    event.preventDefault();

    try {
      let res;
      if (this.state() === 'Sign Up') {
        res = await this.userService.register(this.name, this.email, this.password);
      } else {
        res = await this.userService.login(this.email, this.password);
      }

      if (res.success) {
        this.router.navigate(['/']);
      } else {
        this.toast.error(res.message || 'Something went wrong');
      }
    } catch (err: any) {
      this.toast.error(err.message || 'Something went wrong');
    }
  }
}
