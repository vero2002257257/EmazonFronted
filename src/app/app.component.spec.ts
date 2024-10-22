import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './components/pages/pages.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        CoreModule,    
        PagesModule    
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it('should render the app-header component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should render the app-footer component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should render the app-toast component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-toast')).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
