import { ChangeDetectorRef, Component } from '@angular/core';
import { ToastService, Toast } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.html',
  imports: [CommonModule],
})
export class ToastContainer {
  toasts: Toast[] = [];

  constructor(public toastService: ToastService) {}
}
