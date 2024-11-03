import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonSizes, ButtonTypes } from '../../../shared/utils/enums/atoms-values';
import { Brand } from '../../../core/models/brand-model';
import { Category } from '../../../core/models/category.models';
import { Product } from '../../../core/models/product.models';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';

@Component({
  selector: 'data-form-ext',
  templateUrl: './data-form-ext.component.html',
  styleUrls: ['./data-form-ext.component.scss']
})
export class DataFormExtComponent implements OnInit {
  @Input() brands: Brand[] = [];
  @Input() categories: Category[] = [];
  @Output() submitProduct = new EventEmitter<Product>();

  form: FormGroup;
  selectedBrand: Brand | null = null; 
  selectedCategories: Category[] = [];
  brandSearch: string = '';
  categorySearch: string = '';
  filteredBrands: Brand[] = [];
  filteredCategories: Category[] = [];
  showBrandDropdown = false;
  showCategoryDropdown = false;

  readonly ButtonSizes = ButtonSizes;
  readonly ButtonTypes = ButtonTypes;
  readonly nameLabel = 'Name';
  readonly descriptionLabel = 'Description';
  readonly quantityLabel = 'Quantity';
  readonly priceLabel = 'Price';
  readonly createButtonText = 'Create Product';

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(120)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [, [Validators.required, Validators.min(0.01)]],
      brandId: [null, [Validators.required]],
      categoryIds: [[], [Validators.required, Validators.minLength(1), Validators.maxLength(3)]]
    });
  }

  ngOnInit() {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands(): void {
    this.brandService.getAll().subscribe((brands: Brand[]) => {
      this.brands = brands;
      this.filteredBrands = brands;
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((categories: Category[]) => {
      this.categories = categories;
      this.filteredCategories = categories;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const product: Product = {
        name: this.form.value.name,
        description: this.form.value.description,
        quantity: Number(this.form.value.quantity),  
        price: Number(this.form.value.price),        
        brandId: this.form.value.brandId,            
        categoryIds: this.form.value.categoryIds    
      };
  
      this.submitProduct.emit(product);
      this.resetForm();
    }
  }

  selectBrand(brand: Brand): void {
    this.selectedBrand = brand; // Solo permite una marca seleccionada
    this.form.get('brandId')?.setValue(brand.id);
    this.brandSearch = ''; // Limpia el valor de búsqueda
    this.showBrandDropdown = false; // Oculta el dropdown después de seleccionar
  }
  
  selectCategory(category: Category): void {
    if (this.selectedCategories.length < 3 && !this.selectedCategories.find(c => c.id === category.id)) {
      this.selectedCategories.push(category);
      this.form.get('categoryIds')?.setValue(this.selectedCategories.map(c => c.id));
    }
    this.categorySearch = ''; // Limpia el valor de búsqueda
    this.showCategoryDropdown = false; // Oculta el dropdown después de seleccionar
  }
  

  toggleDropdown(type: 'brand' | 'category', open: boolean = false) {
    if (type === 'brand') {
      this.showBrandDropdown = open ? true : !this.showBrandDropdown;
    } else {
      this.showCategoryDropdown = open ? true : !this.showCategoryDropdown;
    }
  }

  resetForm(): void {
    this.form.reset({
      quantity: 1,
      price: 0
    });
    this.selectedBrand = null;
    this.selectedCategories = [];
  }

  onBrandSearch(searchTerm: string): void {
    this.brandSearch = searchTerm;
    this.filteredBrands = this.brands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onCategorySearch(searchTerm: string): void {
    this.categorySearch = searchTerm;
    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onKeyDown(event: KeyboardEvent, fieldType: string): void {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', 'Decimal', 'Period'];
    const key = event.key;
  
    if (fieldType === 'number') {
      if (!/^\d$/.test(key) && !allowedKeys.includes(key) && key !== '.') {
      event.preventDefault();
      }
    }
  }
  

  removeBrand(): void {
    this.selectedBrand = null;
    this.form.get('brandId')?.setValue(null);
  }
  removeCategory(category: Category): void {
    this.selectedCategories = this.selectedCategories.filter(c => c.id !== category.id);
    this.form.get('categoryIds')?.setValue(this.selectedCategories.map(c => c.id));
  }

  getNameErrorMessage(): string {
    return this.getErrorMessage('name', 50);
  }

  getDescriptionErrorMessage(): string {
    return this.getErrorMessage('description', 120);
  }

  getQuantityErrorMessage() {
    if (this.form.get('quantity')?.hasError('required')) {
      return 'The quantity is required';
    }
    if (this.form.get('quantity')?.hasError('min')) {
      return 'The quantity must be greater than 0';
    }
    return '';
  }
  
  getPriceErrorMessage() {
    if (this.form.get('price')?.hasError('required')) {
      return 'The price is required';
    }
    if (this.form.get('price')?.hasError('min')) {
      return 'The price must be greater than 0';
    }
    return '';
  }

  getBrandErrorMessage(): string {
    return 'Brand is required';
  }

  getCategoryErrorMessage(): string {
    const control = this.form.get('categoryIds');
    if (control?.hasError('minlength')) {
      return 'At least one category is required';
    }
    if (control?.hasError('maxlength')) {
      return 'A maximum of 3 categories are allowed';
    }
    return 'Categories are required';
  }

  private getErrorMessage(controlName: string, maxLength: number): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control?.hasError('maxlength')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} cannot exceed ${maxLength} characters`;
    }
    return '';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.multi-select')) {
      this.showBrandDropdown = false;
      this.showCategoryDropdown = false;
    }
  }
}