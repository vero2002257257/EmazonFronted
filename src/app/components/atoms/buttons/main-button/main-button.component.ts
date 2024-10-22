import { Component, Input } from '@angular/core';
import {
  ButtonSizes,
  ButtonTypes,
} from '../../../../shared/utils/enums/atoms-values';

@Component({
  selector: 'main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
})
export class MainButtonComponent {
  @Input() size: ButtonSizes = ButtonSizes.MEDIUM;
  @Input() type: ButtonTypes = ButtonTypes.MAIN;
  @Input() label: string = 'Save';
  @Input() disabled: boolean = false;
  @Input() htmlType: 'button' | 'submit' | 'reset' = 'button';
  onClick() {
    // Lógica del click
  }
}
