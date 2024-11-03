import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LABEL_TEXT, PLACEHOLDER_TEXT } from '../../../shared/utils/constans/atoms-constans';
import { InputSizes } from '../../../shared/utils/enums/atoms-values';

@Component({
  selector: 'text-input',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor, OnChanges {
  @Input() size: InputSizes = InputSizes.NORMAL;
  @Input() label: string = LABEL_TEXT;
  @Input() errorMessage: string = '';
  @Input() formControlName: string = '';
  @Input() type: string = 'text'; // Add an input for type

  placeholderText = PLACEHOLDER_TEXT;
  onChange: any = () => { }
  onTouch: any = () => { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  input: any = ''; 
  writeValue(input: any): void {
    // Si el tipo es number, convertir el valor a número
    this.input = this.type === 'number' ? +input : input;
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errorMessage']) {
      this.errorMessage = changes['errorMessage'].currentValue;
    }
  }
}