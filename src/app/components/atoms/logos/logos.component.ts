import { Component, Input } from '@angular/core';
import { LogoSizes } from '../../../shared/utils/enums/atoms-values';

@Component({
  selector: 'app-logo',
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.scss']
})
export class LogosComponent {
  @Input() size: LogoSizes = LogoSizes.LARGE;

  // Método para obtener la clase CSS basada en el tamaño del logo
  getSizeClass(): string {
    switch (this.size) {
      case LogoSizes.SMALL:
        return 'small-logo';
      case LogoSizes.MEDIUM:
        return 'medium-logo';
      case LogoSizes.LARGE:
      default:
        return 'large-logo';
    }
  }
}
