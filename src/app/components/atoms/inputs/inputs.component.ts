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
  @Input() size: InputSizes = InputSizes.NORMAL; // Tamaño del input
  @Input() label: string = LABEL_TEXT; // Etiqueta que se muestra arriba del input
  @Input() errorMessage: string = ''; // Mensaje de error para mostrar debajo del input

  placeholderText = PLACEHOLDER_TEXT; // Placeholder predeterminado para el input
  input: string = '';

  // Funciones que se registran para manejar cambios y eventos de toque
  onChange = (value: string) => {};
  onTouch = () => {};

  // Método requerido por ControlValueAccessor para escribir un valor en el input
  writeValue(input: string | null | undefined): void {
    this.input = input ?? '';
  }

  // Método requerido por ControlValueAccessor para registrar la función de cambio
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Método requerido por ControlValueAccessor para registrar la función de toque
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  // Maneja el cambio en el valor del input y emite el cambio a través de onChange
  handleInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.input = inputElement.value;
      this.onChange(this.input);
    }
  }
}
