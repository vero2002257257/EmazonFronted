import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, ToastMessage } from '../../../core/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  toastMessages: ToastMessage[] = [];
  subscription!: Subscription;  

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.toastMessages$.subscribe(messages => {
      this.toastMessages = messages;
    });
  }

  getIconSrc(type: 'error' | 'warning' | 'success' | 'inform'): string {
    switch(type) {
      case 'error':
        return '../../../../assets/icons/error-icon.png';  
      case 'warning':
        return '../../../../assets/icons/warning-icon.png';  
      case 'success':
        return '../../../../assets/icons/success-icon.png';  
      case 'inform':
        return '../../../../assets/icons/info-icon.png'; 
      default:
        return '';
    }
  }

  // Función para cerrar el toast
  closeToast(id: number): void {
    this.toastService.removeToast(id);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}