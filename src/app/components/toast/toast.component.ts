import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class ToastComponent {
  toastMessage: string = '';
  toastType: string = '';
  isVisible: boolean = false;

  constructor(private toastService: ToastService) {

    this.toastService.toastState$.subscribe((toast) => {
      if (toast) {
        this.toastMessage = toast.message;
        this.toastType = this.getToastClass(toast.type);
        this.isVisible = true;

        setTimeout(() => {
          this.isVisible = false;
        }, 3000);
      }
    });
  }

  private getToastClass(type: 'success' | 'error' | 'warning'): string {
    return type === 'success'
      ? 'text-bg-success'
      : type === 'error'
      ? 'text-bg-danger'
      : 'text-bg-warning';
  }
}