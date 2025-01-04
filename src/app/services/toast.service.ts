import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{ message: string; type: ToastType } | null>(null);
  toastState$ = this.toastSubject.asObservable();

  showToast(message: string, type: ToastType): void {
    this.toastSubject.next({ message, type });
    setTimeout(() => this.clearToast(), 3000); 
  }

  clearToast(): void {
    this.toastSubject.next(null);
  }
}