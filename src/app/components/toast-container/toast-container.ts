import { Component } from '@angular/core';
import { ToastService, Toast } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.html',
  imports: [CommonModule],
})
export class ToastContainer {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toasts$.subscribe((toasts) => (this.toasts = toasts));
  }

  dismiss(id: number) {
    this.toastService.dismiss(id);
  }
}
