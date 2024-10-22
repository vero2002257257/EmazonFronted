import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService, ToastMessage } from '../../../core/services/toast.service';
import { of, Subject } from 'rxjs';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;
  let toastMessagesSubject: Subject<ToastMessage[]>;

  beforeEach(async () => {
    toastMessagesSubject = new Subject<ToastMessage[]>();

    await TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        {
          provide: ToastService,
          useValue: {
            toastMessages$: toastMessagesSubject.asObservable(),
            removeToast: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to toastMessages$ on initialization', () => {
    const messages: ToastMessage[] = [
      { id: 1, text: 'Test message', type: 'success' }
    ];
    toastMessagesSubject.next(messages);

    expect(component.toastMessages).toEqual(messages);
  });

  it('should get the correct icon source for each type', () => {
    expect(component.getIconSrc('error')).toBe('../../../../assets/icons/error-icon.png');
    expect(component.getIconSrc('warning')).toBe('../../../../assets/icons/warning-icon.png');
    expect(component.getIconSrc('success')).toBe('../../../../assets/icons/success-icon.png');
    expect(component.getIconSrc('inform')).toBe('../../../../assets/icons/info-icon.png');
    expect(component.getIconSrc('other' as any)).toBe('');
  });

  it('should call removeToast when closeToast is invoked', () => {
    const removeToastSpy = jest.spyOn(toastService, 'removeToast');
    component.closeToast(1);
    expect(removeToastSpy).toHaveBeenCalledWith(1);
  });

  it('should unsubscribe from toastMessages$ on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
