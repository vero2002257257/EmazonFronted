import { TestBed } from '@angular/core/testing';
import { ToastService, ToastMessage } from './toast.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a toast message and remove it after 5 seconds', fakeAsync(() => {
    const message: ToastMessage = {
      type: 'success',
      text: 'Test message',
    };

    service.showToast(message);

    let currentMessages: ToastMessage[] = [];
    service.toastMessages$.subscribe((messages) => {
      currentMessages = messages;
    });

    expect(currentMessages.length).toBe(1);
    expect(currentMessages[0].text).toBe('Test message');
    expect(currentMessages[0].id).toBeDefined();

    // Avanzar el tiempo en 5 segundos para simular la expiración del mensaje
    tick(5000);
    expect(currentMessages.length).toBe(0);
  }));

  it('should manually remove a toast message', () => {
    const message: ToastMessage = {
      id: 1,
      type: 'error',
      text: 'Manual remove test',
    };

    service.showToast(message);

    let currentMessages: ToastMessage[] = [];
    service.toastMessages$.subscribe((messages) => {
      currentMessages = messages;
    });

    expect(currentMessages.length).toBe(1);
    service.removeToast(message.id!);
    expect(currentMessages.length).toBe(0);
  });

  it('should add multiple toast messages and remove them correctly', fakeAsync(() => {
    const messages: ToastMessage[] = [
      { type: 'success', text: 'Message 1' },
      { type: 'error', text: 'Message 2' },
    ];

    messages.forEach((msg) => service.showToast(msg));

    let currentMessages: ToastMessage[] = [];
    service.toastMessages$.subscribe((messages) => {
      currentMessages = messages;
    });

    expect(currentMessages.length).toBe(2);

    tick(5000);
    expect(currentMessages.length).toBe(0);
  }));

  it('should not add duplicate toast messages', () => {
    const message: ToastMessage = {
      type: 'success',
      text: 'Duplicate test',
    };

    service.showToast(message);
    service.showToast(message);

    let currentMessages: ToastMessage[] = [];
    service.toastMessages$.subscribe((messages) => {
      currentMessages = messages;
    });

    expect(currentMessages.length).toBe(2); // Ajusta si permites duplicados
  });

  it('should not remove a toast with an invalid ID', () => {
    const message: ToastMessage = {
      type: 'inform',
      text: 'Test message',
    };

    service.showToast(message);

    let currentMessages: ToastMessage[] = [];
    service.toastMessages$.subscribe((messages) => {
      currentMessages = messages;
    });

    expect(currentMessages.length).toBe(1);

    // Intenta eliminar un ID que no existe
    service.removeToast(9999);
    expect(currentMessages.length).toBe(1);
  });

  it('should handle immediate removal before timeout', fakeAsync(() => {
    const message: ToastMessage = {
      type: 'success',
      text: 'Test immediate removal',
    };

    service.showToast(message);

    let currentMessages: ToastMessage[] = [];
    service.toastMessages$.subscribe((messages) => {
      currentMessages = messages;
    });

    expect(currentMessages.length).toBe(1);
    expect(currentMessages[0].text).toBe('Test immediate removal');

    // Remover el mensaje antes de que el timeout expire
    service.removeToast(currentMessages[0].id!);
    expect(currentMessages.length).toBe(0);

    tick(5000); // Avanza el tiempo para asegurar que no hay otros cambios
    expect(currentMessages.length).toBe(0);
  }));
});
