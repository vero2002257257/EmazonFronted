import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputsComponent } from './inputs.component';
import { InputSizes } from '../../../shared/utils/enums/atoms-values';
import { LABEL_TEXT, PLACEHOLDER_TEXT } from '../../../shared/utils/constans/atoms-constans';

describe('InputsComponent', () => {
  let component: InputsComponent;
  let fixture: ComponentFixture<InputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputsComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.size).toBe(InputSizes.NORMAL);
    expect(component.label).toBe(LABEL_TEXT);
    expect(component.errorMessage).toBe('');
    expect(component.placeholderText).toBe(PLACEHOLDER_TEXT);
  });

  it('should call onTouch when touched', () => {
    const onTouchSpy = jest.fn();
    component.registerOnTouched(onTouchSpy);

    component.onTouch();
    fixture.detectChanges();

    expect(onTouchSpy).toHaveBeenCalled();
  });

  it('should update input when writeValue is called', () => {
    component.writeValue('Test Value');
    fixture.detectChanges();
    expect(component.input).toBe('Test Value');
  });

  it('should display label correctly', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    const labelElement: HTMLElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should have placeholder text', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.placeholder).toBe(PLACEHOLDER_TEXT);
  });

  it('should handle input value change correctly', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'New input value';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.input).toBe('New input value');
  });

  it('should handle writeValue with null correctly', () => {
    component.writeValue(null);
    fixture.detectChanges();
    expect(component.input).toBe(''); // Asume que el input se resetea a un valor vacío
  });

  it('should handle writeValue with undefined correctly', () => {
    component.writeValue(undefined);
    fixture.detectChanges();
    expect(component.input).toBe(''); // Asume que el input se resetea a un valor vacío
  });

});