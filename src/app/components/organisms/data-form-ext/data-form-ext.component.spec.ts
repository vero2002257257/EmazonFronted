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
  describe('loadBrands', () => {
    it('should load brands and set brands and filteredBrands', () => {
      const mockBrands = [{ id: 1, name: 'Brand1',description: 'description' }, { id: 2, name: 'Brand2',description: 'description'  }];
      brandService.getAll.mockReturnValue(of(mockBrands));

      component.loadBrands();

      expect(brandService.getAll).toHaveBeenCalled();
      expect(component.brands).toEqual(mockBrands);
      expect(component.filteredBrands).toEqual(mockBrands);
    });
  });

  describe('loadCategories', () => {
    it('should load categories and set categories and filteredCategories', () => {
      const mockCategories = [{ id: 1, name: 'Category1',description: 'description'  }, { id: 2, name: 'Category2',description: 'description'  }];
      categoryService.getAll.mockReturnValue(of(mockCategories));

      component.loadCategories();

      expect(categoryService.getAll).toHaveBeenCalled();
      expect(component.categories).toEqual(mockCategories);
      expect(component.filteredCategories).toEqual(mockCategories);
    });
  });

  describe('toggleDropdown', () => {
    it('should toggle showBrandDropdown when type is "brand"', () => {
      component.showBrandDropdown = false;
      component.toggleDropdown('brand');
      expect(component.showBrandDropdown).toBe(true);

      component.toggleDropdown('brand');
      expect(component.showBrandDropdown).toBe(false);
    });

    it('should toggle showCategoryDropdown when type is "category"', () => {
      component.showCategoryDropdown = false;
      component.toggleDropdown('category');
      expect(component.showCategoryDropdown).toBe(true);

      component.toggleDropdown('category');
      expect(component.showCategoryDropdown).toBe(false);
    });
  });

});