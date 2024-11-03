import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataFormExtComponent } from './data-form-ext.component';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DataFormExtComponent', () => {
  let component: DataFormExtComponent;
  let fixture: ComponentFixture<DataFormExtComponent>;
  let brandService: jest.Mocked<BrandService>;
  let categoryService: jest.Mocked<CategoryService>;

  beforeEach(async () => {
    const brandSpy = {
      getAll: jest.fn()
    };
    const categorySpy = {
      getAll: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [DataFormExtComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: BrandService, useValue: brandSpy },
        { provide: CategoryService, useValue: categorySpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DataFormExtComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>;
    categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load brands on init', () => {
    const brands = [{ id: 1, name: 'Brand 1', description: 'Description' }];
    brandService.getAll.mockReturnValue(of(brands));
    fixture.detectChanges();
    expect(component.brands).toEqual(brands);
  });

  it('should handle error when loading brands', () => {
    const error = 'Error loading brands';
    brandService.getAll.mockReturnValue(throwError(() => new Error(error)));
    console.error = jest.fn();
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith('Error loading brands:', expect.any(Error));
  });

  it('should load categories on init', () => {
    const categories = [{ id: 1, name: 'Category 1', description: 'Description' }];
    categoryService.getAll.mockReturnValue(of(categories));
    fixture.detectChanges();
    expect(component.categories).toEqual(categories);
  });

  it('should handle error when loading categories', () => {
    const error = 'Error loading categories';
    categoryService.getAll.mockReturnValue(throwError(() => new Error(error)));
    console.error = jest.fn();
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith('Error loading categories:', expect.any(Error));
  });

  it('should emit product on submit', () => {
    jest.spyOn(component.submitProduct, 'emit');
    component.form.setValue({
      name: 'Product 1',
      description: 'Description',
      quantity: 1,
      price: 10,
      brandId: 1,
      categoryIds: [1]
    });
    component.onSubmit();
    expect(component.submitProduct.emit).toHaveBeenCalledWith({
      name: 'Product 1',
      description: 'Description',
      quantity: 1,
      price: 10,
      brandId: 1,
      categoryIds: [1]
    });
  });

  it('should reset form on submit', () => {
    component.form.setValue({
      name: 'Product 1',
      description: 'Description',
      quantity: 1,
      price: 10,
      brandId: 1,
      categoryIds: [1]
    });
    component.onSubmit();
    expect(component.form.value).toEqual({
      name: '',
      description: '',
      quantity: 1,
      price: 0,
      brandId: null,
      categoryIds: []
    });
  });

  it('should select brand', () => {
    const brand = { id: 1, name: 'Brand 1', description: 'Description' };
    component.selectBrand(brand);
    expect(component.selectedBrand).toEqual(brand);
    expect(component.form.get('brandId')?.value).toBe(brand.id);
  });

  it('should select category', () => {
    const category = { id: 1, name: 'Category 1', description: 'Description' };
    component.selectCategory(category);
    expect(component.selectedCategories).toContain(category);
    expect(component.form.get('categoryIds')?.value).toContain(category.id);
  });

  it('should remove brand', () => {
    const brand = { id: 1, name: 'Brand 1' , description: 'Description'};
    component.selectBrand(brand);
    component.removeBrand();
    expect(component.selectedBrand).toBeNull();
    expect(component.form.get('brandId')?.value).toBeNull();
  });

  it('should remove category', () => {
    const category = { id: 1, name: 'Category 1', description: 'Description' };
    component.selectCategory(category);
    component.removeCategory(category);
    expect(component.selectedCategories).not.toContain(category);
    expect(component.form.get('categoryIds')?.value).not.toContain(category.id);
  });
});