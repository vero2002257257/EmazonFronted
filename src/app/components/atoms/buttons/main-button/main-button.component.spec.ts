import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainButtonComponent } from './main-button.component';
import { ButtonSizes, ButtonTypes } from '../../../../shared/utils/enums/atoms-values';
import { By } from '@angular/platform-browser';

describe('MainButtonComponent', () => {
  let component: MainButtonComponent;
  let fixture: ComponentFixture<MainButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default size as MEDIUM', () => {
    expect(component.size).toBe(ButtonSizes.MEDIUM);
  });
  it('should have default htmlType as "button"', () => {
    expect(component.htmlType).toBe('button');
  });

  it('should have default disabled as false', () => {
    expect(component.disabled).toBe(false);
  });

  it('should render the label text correctly', () => {
    component.label = 'Click Me';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.textContent.trim()).toBe('Click Me');
  });

  it('should apply the correct size class', () => {
    component.size = ButtonSizes.SMALL;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.classList).toContain('small'); // Asegúrate de que la clase exista en tu CSS
  });

  it('should disable the button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.disabled).toBe(true);
  });

  it('should have the correct htmlType', () => {
    component.htmlType = 'submit';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.type).toBe('submit');
  });

  it('should apply the correct type class', () => {
    component.type = ButtonTypes.SECONDARY;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.classList).toContain('secondary'); // Asegúrate de que la clase exista en tu CSS
  });

  it('should trigger click event when button is clicked', () => {
    jest.spyOn(component, 'onClick');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    fixture.detectChanges();
    expect(component.onClick).toHaveBeenCalled();
  });

  it('should apply the correct class when size is LARGE', () => {
    component.size = ButtonSizes.LARGE;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.classList).toContain('large'); // Asegúrate de que la clase exista en tu CSS
  });

  it('should apply the correct class when type is DANGER', () => {
    component.type = ButtonTypes.DANGER;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.classList).toContain('danger'); // Asegúrate de que la clase exista en tu CSS
  });

  it('should not trigger click event when button is disabled', () => {
    jest.spyOn(component, 'onClick');
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    fixture.detectChanges();
    expect(component.onClick).not.toHaveBeenCalled();
  });

  it('should render the correct htmlType when set to reset', () => {
    component.htmlType = 'reset';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(buttonElement.type).toBe('reset');
  });
});