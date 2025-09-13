import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  private idCounter = 0;

  show(message: string, type: ToastType = 'info', duration = 3000) {
    const id = this.idCounter++;
    const toast: Toast = { id, message, type };

    const current = this.toastsSubject.value;
    this.toastsSubject.next([...current, toast]);

    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter((t) => t.id !== id));
  }

  success(msg: string, duration = 3000) {
    this.show(msg, 'success', duration);
  }

  error(msg: string, duration = 3000) {
    this.show(msg, 'error', duration);
  }

  info(msg: string, duration = 3000) {
    this.show(msg, 'info', duration);
  }

  warning(msg: string, duration = 3000) {
    this.show(msg, 'warning', duration);
  }
}
