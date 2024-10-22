import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastMessagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  toastMessages$ = this.toastMessagesSubject.asObservable();

  constructor() {}

  showToast(message: ToastMessage): void {
    const currentMessages = this.toastMessagesSubject.value;
    message.id = Date.now();  
    this.toastMessagesSubject.next([...currentMessages, message]);

    setTimeout(() => {
      this.removeToast(message.id!);
    }, 5000); 
  }

  removeToast(id: number): void {
    const updatedMessages = this.toastMessagesSubject.value.filter(msg => msg.id !== id);
    this.toastMessagesSubject.next(updatedMessages);
  }
}

export interface ToastMessage {
  id?: number;  
  type: 'error' | 'warning' | 'success' | 'inform';  
  text: string; 
}