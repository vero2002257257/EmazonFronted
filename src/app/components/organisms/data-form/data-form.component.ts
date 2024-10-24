import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonSizes, ButtonTypes } from '../../../shared/utils/enums/atoms-values'; 
import { ReactiveFormsModule } from '@angular/forms';

interface FormData {
  name: string;
  description: string;
}

@Component({
  selector: 'data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent {
  @Input() title: string = '';  
  @Output() submitForm = new EventEmitter<FormData>();  
  form: FormGroup;

  readonly ButtonSizes = ButtonSizes;  
  readonly ButtonTypes = ButtonTypes;  

  readonly nameLabel = 'Name';
  readonly descriptionLabel = 'Description';
  readonly createButtonText = 'Create Category';  

  readonly name = 'name';
  readonly description = 'description';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      [this.name]: ['', [Validators.required, Validators.maxLength(50)]],
      [this.description]: ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
      const entityData: FormData = this.form.value;
      this.submitForm.emit(entityData);
    } else {
      console.log('Form is invalid');
    }
  }

  getErrorMessage(controlName: string, maxLength: number): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control?.hasError('maxlength')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} cannot exceed ${maxLength} characters`;
    }
    return '';
  }

  getNameErrorMessage(): string {
    return this.getErrorMessage(this.name, 50);
  }

  getDescriptionErrorMessage(): string {
    return this.getErrorMessage(this.description, 120);
  }

  resetForm() {
    this.form.reset();
  }
}
