import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {
  @Output() onSortChange = new EventEmitter<string>();

  emitSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.onSortChange.emit(target.value);
    }
  }

}
