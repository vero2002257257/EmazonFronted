import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFormComponent } from './card-form.component';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
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
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
    const formTitleElement: HTMLElement = fixture.nativeElement.querySelector('.form-title');
    expect(formTitleElement.textContent).toBe('Test Form Title');
  });

  it('should emit submitForm when onFormSubmit is called', () => {
    const emitSpy = jest.spyOn(component.submitForm, 'emit');
    const formData = { name: 'Test', description: 'Description' };
    
    component.onFormSubmit(formData);
    
    expect(emitSpy).toHaveBeenCalledWith(formData);
  });

});
