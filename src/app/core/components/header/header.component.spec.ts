import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menuOpen initially set to false', () => {
    expect(component.menuOpen).toBe(false);
  });

  it('should toggle menuOpen when toggleMenu is called', () => {
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);

    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('should add "menu-open" class to header when menuOpen is true', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('.header');
    expect(headerElement.classList).toContain('menu-open');
  });

  it('should not have "menu-open" class when menuOpen is false', () => {
    component.menuOpen = false;
    fixture.detectChanges();
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('.header');
    expect(headerElement.classList).not.toContain('menu-open');
  });

  it('should display the correct icon when menu is open', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const iconElement: HTMLElement = fixture.nativeElement.querySelector('button i');
    expect(iconElement.classList).toContain('fa-chevron-left');  // Verifica el icono correcto
  });

  it('should display the correct icon when menu is closed', () => {
    component.menuOpen = false;
    fixture.detectChanges();
    const iconElement: HTMLElement = fixture.nativeElement.querySelector('button i');
    expect(iconElement.classList).toContain('fa-bars');  // Verifica el icono correcto
  });

  it('should toggle the menu when the menu button is clicked', () => {
    const menuButton = fixture.debugElement.query(By.css('.header__menu-button'));
    menuButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.menuOpen).toBe(true);

    menuButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.menuOpen).toBe(false);
  });

  it('should render the navigation menu when menuOpen is true', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const navElement: HTMLElement = fixture.nativeElement.querySelector('.header__nav');
    expect(navElement.classList).not.toContain('hidden');
  });

  it('should hide the navigation menu when menuOpen is false', () => {
    component.menuOpen = false;
    fixture.detectChanges();
    const navElement: HTMLElement = fixture.nativeElement.querySelector('.header__nav');
    expect(navElement.classList).toContain('hidden');
  });

  it('should have a title with text "Emazon"', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.header__title');
    expect(titleElement.textContent).toContain('Emazon');
  });
});
