import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  LABEL_TEXT,
  PLACEHOLDER_TEXT,
} from '../../../shared/utils/constans/atoms-constans';
import { InputSizes } from '../../../shared/utils/enums/atoms-values';

@Component({
  selector: 'text-input',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputsComponent),
      multi: true,
    },
  ],
})
export class InputsComponent implements ControlValueAccessor {
  @Input() size: InputSizes = InputSizes.NORMAL;
  @Input() label: string = LABEL_TEXT;
  @Input() errorMessage: string = '';

  placeholderText = PLACEHOLDER_TEXT;
  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  input: string = '';

  writeValue(input: string | null | undefined): void {
    this.input = input ?? '';
  }

  handleInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.input = inputElement.value;
      if (this.onChange) {
        this.onChange(inputElement.value);
      }
    }
  }
}
