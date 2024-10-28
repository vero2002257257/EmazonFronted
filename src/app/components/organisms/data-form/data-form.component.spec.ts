import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { ReactiveFormsModule } from '@angular/forms';
import { DataFormComponent } from './data-form.component';
import { AtomsModule } from '../../atoms/atoms.module'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('DataFormComponent', () => {
  let component: DataFormComponent;
  let fixture: ComponentFixture<DataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFormComponent],
      imports: [ReactiveFormsModule, AtomsModule],
      providers: [FormBuilder],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default name label as "Name"', () => {
    expect(component.nameLabel).toBe('Name');
  });

  it('should initialize form with name and description controls', () => {
    expect(component.form.contains(component.name)).toBeTruthy();
    expect(component.form.contains(component.description)).toBeTruthy();
  });

  it('should require name and description', () => {
    const nameControl = component.form.get(component.name);
    const descriptionControl = component.form.get(component.description);

    nameControl?.setValue('');
    descriptionControl?.setValue('');

    expect(nameControl?.valid).toBeFalsy();
    expect(descriptionControl?.valid).toBeFalsy();
    expect(component.getNameErrorMessage()).toBe('Name is required');
    expect(component.getDescriptionErrorMessage()).toBe('Description is required');
  });

  it('should emit submitForm if form is valid', () => {
    jest.spyOn(component.submitForm, 'emit');
    component.form.setValue({ name: 'Valid Name', description: 'Valid Description' });
    component.onSubmit();
    expect(component.submitForm.emit).toHaveBeenCalledWith({ name: 'Valid Name', description: 'Valid Description' });
  });

  it('should not emit submitForm if form is invalid', () => {
    jest.spyOn(component.submitForm, 'emit');
    component.form.setValue({ name: '', description: '' });
    component.onSubmit();
    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });
  it('should reset form when resetForm is called', () => {
    component.form.setValue({ name: 'Test', description: 'Test description' });
    component.resetForm();
    expect(component.form.value).toEqual({ name: null, description: null });
  });

  it('should disable the submit button when the form is invalid', () => {
    component.form.setValue({ name: '', description: '' });
    fixture.detectChanges();
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', () => {
    component.form.setValue({ name: 'Valid Name', description: 'Valid Description' });
    fixture.detectChanges();
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(submitButton.disabled).toBeFalsy();
  });
  it('should return "Name is required" if name control has required error', () => {
    const nameControl = component.form.get('name');
    nameControl?.setErrors({ required: true });
    const errorMessage = component.getErrorMessage('name', 50);
    expect(errorMessage).toBe('Name is required');
  });
  
  it('should return "Description is required" if description control has required error', () => {
    const descriptionControl = component.form.get('description');
    descriptionControl?.setErrors({ required: true });
    const errorMessage = component.getErrorMessage('description', 50);
    expect(errorMessage).toBe('Description is required');
  });
  
  it('should return "Name cannot exceed 50 characters" if name control has maxlength error', () => {
    const nameControl = component.form.get('name');
    nameControl?.setErrors({ maxlength: true });
    const errorMessage = component.getErrorMessage('name', 50);
    expect(errorMessage).toBe('Name cannot exceed 50 characters');
  });
  
  it('should return "Description cannot exceed 100 characters" if description control has maxlength error', () => {
    const descriptionControl = component.form.get('description');
    descriptionControl?.setErrors({ maxlength: true });
    const errorMessage = component.getErrorMessage('description', 100);
    expect(errorMessage).toBe('Description cannot exceed 100 characters');
  });
  
  it('should return an empty string if there are no errors', () => {
    const nameControl = component.form.get('name');
    nameControl?.setErrors(null); // No errors
    const errorMessage = component.getErrorMessage('name', 50);
    expect(errorMessage).toBe('');
  });
  
});
