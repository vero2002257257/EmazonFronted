import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filteredItems in ngOnInit', () => {
    component.items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    component.ngOnInit();
    expect(component.filteredItems).toEqual(component.items);
  });

  it('should filter items based on search input', () => {
    component.items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    component.ngOnInit();
    component.searchControl.setValue('Item 1');
    component.onSearch({ target: { value: 'Item 1' } } as any);
    expect(component.filteredItems).toEqual([{ id: 1, name: 'Item 1' }]);
  });

  it('should toggle dropdown state', () => {
    const event = new Event('click');
    jest.spyOn(event, 'stopPropagation');

    component.isOpen = false;
    component.toggleDropdown(event);
    expect(component.isOpen).toBeTruthy();

    component.toggleDropdown(event);
    expect(component.isOpen).toBeFalsy();
  });

  it('should open dropdown on focus', () => {
    component.isOpen = false;
    component.onFocus();
    expect(component.isOpen).toBeTruthy();
  });

  it('should select an item and emit selectionChange', () => {
    const item = { id: 1, name: 'Item 1' };
    jest.spyOn(component.selectionChange, 'emit');
    component.selectItem(item, new Event('click'));

    expect(component.selectedItems).toContain(item);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(item);
  });

  it('should select multiple items if multiple is true', () => {
    component.multiple = true;
    const item1 = { id: 1, name: 'Item 1' };
    const item2 = { id: 2, name: 'Item 2' };

    component.selectItem(item1, new Event('click'));
    expect(component.selectedItems).toContain(item1);

    component.selectItem(item2, new Event('click'));
    expect(component.selectedItems).toContain(item2);

    // Deselect item1
    component.selectItem(item1, new Event('click'));
    expect(component.selectedItems).not.toContain(item1);
  });

  it('should remove an item and emit selectionChange', () => {
    const item = { id: 1, name: 'Item 1' };
    component.selectedItems = [item];
    jest.spyOn(component.selectionChange, 'emit');

    component.removeItem(item, new Event('click'));

    expect(component.selectedItems).not.toContain(item);
    expect(component.selectionChange.emit).toHaveBeenCalledWith(null);
  });

  it('should return true if item is selected', () => {
    const item = { id: 1, name: 'Item 1' };
    component.selectedItems = [item];
    expect(component.isSelected(item)).toBeTruthy();
  });

  it('should return false if item is not selected', () => {
    const item = { id: 2, name: 'Item 2' };
    component.selectedItems = [{ id: 1, name: 'Item 1' }];
    expect(component.isSelected(item)).toBeFalsy();
  });

  it('should return placeholder when no items are selected', () => {
    component.selectedItems = [];
    expect(component.getPlaceholder()).toBe(component.placeholder);
  });

  it('should return empty string when items are selected', () => {
    component.selectedItems = [{ id: 1, name: 'Item 1' }];
    expect(component.getPlaceholder()).toBe('');
  });

  it('should close dropdown on outside click', () => {
    component.isOpen = true;
    const event = new Event('click');
    jest.spyOn(event, 'stopPropagation');
    component.onClickOutside(event);
    expect(component.isOpen).toBeFalsy();
  });
});
