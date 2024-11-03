import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let brandService: jest.Mocked<BrandService>;
  let categoryService: jest.Mocked<CategoryService>;
  let productService: jest.Mocked<ProductService>;

  beforeEach(async () => {
    const brandSpy = {
      getAll: jest.fn()
    };
    const categorySpy = {
      getAll: jest.fn()
    };
    const productSpy = {
      create: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: BrandService, useValue: brandSpy },
        { provide: CategoryService, useValue: categorySpy },
        { provide: ProductService, useValue: productSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>;
    categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load brands on init', () => {
    const brands = [{ id: 1, name: 'Brand 1' , description: 'Description' }];
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
    const categories = [{ id: 1, name: 'Category 1' , description: 'Description' }];
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

  it('should create product successfully', () => {
    const product = { name: 'Product 1', description: 'Description', quantity: 1, price: 10, brandId: 1, categoryIds: [1] };
    productService.create.mockReturnValue(of(true));
    console.log = jest.fn();
    component.createProduct(product);
    expect(console.log).toHaveBeenCalledWith('Product created successfully');
  });

  it('should handle error when creating product', () => {
    const product = { name: 'Product 1', description: 'Description', quantity: 1, price: 10, brandId: 1, categoryIds: [1] };
    const error = 'Error creating product';
    productService.create.mockReturnValue(throwError(() => new Error(error)));
    console.error = jest.fn();
    component.createProduct(product);
    expect(console.error).toHaveBeenCalledWith('Error creating product:', expect.any(Error));
  });
});