import { Component } from '@angular/core';
import { ToastService, Toast } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  template: `
    <div class="fixed top-5 right-5 z-50 space-y-3">
      <div
        *ngFor="let toast of toasts"
        class="px-4 py-3 rounded-lg shadow-lg text-white flex items-center justify-between"
        [ngClass]="
          toast.type === 'success'
            ? 'bg-green-500'
            : toast.type === 'error'
            ? 'bg-red-500'
            : toast.type === 'warning'
            ? 'bg-yellow-500 text-black'
            : 'bg-blue-500'
        "
      >
        <span>{{ toast.message }}</span>
        <button class="ml-3 text-white/80 hover:text-white" (click)="dismiss(toast.id)">✕</button>
      </div>
    </div>
  `,
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
