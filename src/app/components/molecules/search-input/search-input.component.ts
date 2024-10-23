import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Output() search = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.search.emit(value);
  }
}