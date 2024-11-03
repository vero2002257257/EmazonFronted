import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonSizes, ButtonTypes } from '../../../shared/utils/enums/atoms-values';

interface FormData {
  name: string;
  description: string;
}

@Component({
  selector: 'data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnChanges {
  @Input() title: string = '';
  @Input() maxNameLength: number = 50; 
  @Input() maxDescriptionLength: number = 120; 

  @Output() submitForm = new EventEmitter<FormData>();

  form: FormGroup;
  readonly ButtonSizes = ButtonSizes;
  readonly ButtonTypes = ButtonTypes;

  readonly nameLabel = 'Name';
  readonly descriptionLabel = 'Description';
  readonly createButtonText = 'Create';

  readonly name = 'name';
  readonly description = 'description';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      [this.name]: ['', [Validators.required, Validators.maxLength(this.maxNameLength)]],
      [this.description]: ['', [Validators.required, Validators.maxLength(this.maxDescriptionLength)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['maxNameLength'] || changes['maxDescriptionLength']) {
      this.updateValidators();
    }
  }

  updateValidators() {
    this.form.get(this.name)?.setValidators([
      Validators.required,
      Validators.maxLength(this.maxNameLength)
    ]);
    this.form.get(this.description)?.setValidators([
      Validators.required,
      Validators.maxLength(this.maxDescriptionLength)
    ]);
    this.form.get(this.name)?.updateValueAndValidity();
    this.form.get(this.description)?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
      const entityData: FormData = this.form.value;
      this.submitForm.emit(entityData);
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
    return this.getErrorMessage(this.name, this.maxNameLength);
  }

  getDescriptionErrorMessage(): string {
    return this.getErrorMessage(this.description, this.maxDescriptionLength);
  }

  resetForm() {
    this.form.reset();
  }
}