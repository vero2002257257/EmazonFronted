import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef  } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() items: any[] = [];
  @Input() multiple: boolean = false;
  @Input() placeholder: string = 'Select...';
  @Input() showSearchIcon: boolean = true;
  @Output() selectionChange = new EventEmitter<any>();

  isOpen = false;
  searchControl = new FormControl('');
  selectedItems: any[] = [];
  filteredItems: any[] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.filteredItems = this.items;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  onFocus() {
    this.isOpen = true;
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredItems = this.items.filter(item => 
      item.name.toLowerCase().includes(value)
    );
  }

  selectItem(item: any, event: Event) {
    event.stopPropagation();
    
    if (this.multiple) {
      const index = this.selectedItems.findIndex(i => i.id === item.id);
      if (index === -1) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems.splice(index, 1);
      }
    } else {
      this.selectedItems = [item];
      this.isOpen = false;
    }
    
    this.selectionChange.emit(this.multiple ? this.selectedItems : this.selectedItems[0]);
  }

  removeItem(item: any, event: Event) {
    event.stopPropagation();
    const index = this.selectedItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
      this.selectionChange.emit(this.multiple ? this.selectedItems : null);
    }
  }

  isSelected(item: any): boolean {
    return this.selectedItems.some(i => i.id === item.id);
  }

  getPlaceholder(): string {
    return this.selectedItems.length > 0 ? '' : this.placeholder;
  }
}