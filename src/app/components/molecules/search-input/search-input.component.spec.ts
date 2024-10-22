import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isFocused to true when input is focused', () => {
    component.onFocus();
    expect(component.isFocused).toBe(true);
  });

  it('should set isFocused to false when input loses focus', () => {
    component.onBlur();
    expect(component.isFocused).toBe(false);
  });

  it('should set isFocused to true if searchTerm length is greater than 5 on ngOnInit', () => {
    component.searchTerm = 'longer than five';
    component.ngOnInit();
    expect(component.isFocused).toBe(true);
  });

  it('should set isFocused to false if searchTerm length is less than or equal to 5 on ngOnInit', () => {
    component.searchTerm = 'short';
    component.ngOnInit();
    expect(component.isFocused).toBe(false);
  });

  it('should handle search term with exactly 5 characters', () => {
    component.searchTerm = 'abcde';
    component.ngOnInit();
    expect(component.isFocused).toBe(false);
  });
});
