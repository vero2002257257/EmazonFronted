import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './inputs.component';
import { InputSizes } from '../../../shared/utils/enums/atoms-values';
import { LABEL_TEXT, PLACEHOLDER_TEXT } from '../../../shared/utils/constans/atoms-constans';

describe('InputsComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
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

  it('should call onChange when value changes', () => {
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    component.input = 'Test Value';
    component.onChange(component.input);
    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith('Test Value');
  });

  it('should update input when writeValue is called', () => {
    component.writeValue('Test Value');
    fixture.detectChanges();
    expect(component.input).toBe('Test Value');
  });

  it('should handle number type input correctly', () => {
    component.type = 'number';
    component.writeValue('123');
    fixture.detectChanges();

    expect(component.input).toBe(123);
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

  it('should handle changes in errorMessage input', () => {
    component.ngOnChanges({
      errorMessage: {
        currentValue: 'New error',
        previousValue: '',
        firstChange: false,
        isFirstChange: () => false,
      }
    });
    fixture.detectChanges();
    expect(component.errorMessage).toBe('New error');
  });
});
