import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, Loading],
  templateUrl: './button.html',
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() fullWidth = false;
  @Input() disabled = false;
  @Input() loading = false;

  get classes() {
    const base =
      'py-2 rounded-md text-base font-medium transition-all flex align-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed';
    const width = this.fullWidth ? 'w-full' : 'inline-block';
    const color = {
      primary: 'bg-primary text-white hover:bg-primary-dark',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    }[this.variant];

    return [base, width, color].join(' ');
  }
}
