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
  @Input() class = '';
  @Input() outline = false; // ✅ new prop

  get classes() {
    const base =
      'py-2 px-2 rounded-md text-base font-medium cursor-pointer transition-all flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed';
    const width = this.fullWidth ? 'w-full' : 'inline-block';

    let color = '';
    if (this.outline) {
      const outlineStyles = {
        primary: 'border border-primary text-primary hover:bg-primary hover:text-white',
        secondary: 'border border-gray-400 text-gray-800 hover:bg-gray-100',
        danger: 'border border-red-500 text-red-500 hover:bg-red-50',
      };
      color = outlineStyles[this.variant];
    } else {
      const fillStyles = {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      };
      color = fillStyles[this.variant];
    }

    return [base, width, color, this.class].join(' ');
  }
}
