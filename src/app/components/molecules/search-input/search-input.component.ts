import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  searchTerm: string = '';
  isFocused: boolean = false;

  constructor() {}

  ngOnInit(): void {
    // Ejemplo de una línea que podría no estar cubierta
    if (this.searchTerm.length > 5) {
      this.isFocused = true;
    }
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
  }

 

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
  }
}
