import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageComponent } from './page.component';
import { CoreModule } from '../../core.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageComponent],
      imports: [CoreModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Para evitar errores con componentes personalizados
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-header', () => {
    const headerElement = fixture.nativeElement.querySelector('app-header');
    expect(headerElement).toBeTruthy();
  });
  it('should render router-outlet', () => {
    const routerOutletElement = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutletElement).toBeTruthy();
  });

  it('should render app-toast', () => {
    const toastElement = fixture.nativeElement.querySelector('app-toast');
    expect(toastElement).toBeTruthy();
  });

  it('should render app-footer', () => {
    const footerElement = fixture.nativeElement.querySelector('app-footer');
    expect(footerElement).toBeTruthy();
  });
});
