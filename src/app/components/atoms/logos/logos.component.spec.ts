import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogosComponent } from './logos.component';
import { LogoSizes } from '../../../shared/utils/enums/atoms-values';

describe('LogosComponent', () => {
  let component: LogosComponent;
  let fixture: ComponentFixture<LogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have LARGE as the default size', () => {
    expect(component.size).toBe(LogoSizes.LARGE);
  });

  it('should return the correct class for large logo size', () => {
    component.size = LogoSizes.LARGE;
    expect(component.getSizeClass()).toBe('large-logo');
  });

  it('should return the correct class for medium logo size', () => {
    component.size = LogoSizes.MEDIUM;
    expect(component.getSizeClass()).toBe('medium-logo');
  });

  it('should return the correct class for small logo size', () => {
    component.size = LogoSizes.SMALL;
    expect(component.getSizeClass()).toBe('small-logo');
  });

  it('should update the class when size input changes', () => {
    component.size = LogoSizes.SMALL;
    fixture.detectChanges();

    let logoElement: HTMLElement = fixture.nativeElement.querySelector('.logo');
    expect(logoElement.classList).toContain('small-logo');

    component.size = LogoSizes.MEDIUM;
    fixture.detectChanges();

    logoElement = fixture.nativeElement.querySelector('.logo');
    expect(logoElement.classList).toContain('medium-logo');
  });

  it('should render image with the correct class', () => {
    component.size = LogoSizes.SMALL;
    fixture.detectChanges();

    const imgElement: HTMLElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.classList).toContain('small');

    component.size = LogoSizes.MEDIUM;
    fixture.detectChanges();

    expect(imgElement.classList).toContain('medium');
  });
});
