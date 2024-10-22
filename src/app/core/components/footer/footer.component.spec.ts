import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFormComponent } from '../../../components/templates/card-form/card-form.component';
import { DataFormComponent } from '../../../components/organisms/data-form/data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../../../components/atoms/atoms.module';
import { MoleculesModule } from '../../../components/molecules/molecules.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFormComponent, DataFormComponent],
      imports: [
        ReactiveFormsModule,
        AtomsModule,
        MoleculesModule,
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Permite el uso de elementos personalizados
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(titleElement.textContent).toBe('Test Title');
  });

  it('should display the correct formTitle', () => {
    component.formTitle = 'Test Form Title';
    fixture.detectChanges();
    const formTitleElement: HTMLElement =
      fixture.nativeElement.querySelector('.form-title');
    expect(formTitleElement.textContent).toBe('Test Form Title');
  });
});
