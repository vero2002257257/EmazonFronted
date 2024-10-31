import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductComponent } from './product.component';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';
import { Brand } from '../../../core/models/brand-model';
import { Category } from '../../../core/models/category.models';
import { Product } from '../../../core/models/product.models';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let brandServiceMock: any;
  let categoryServiceMock: any;
  let productServiceMock: any;

  beforeEach(async () => {
    brandServiceMock = {
      getAll: jest.fn()
    };

    categoryServiceMock = {
      getAll: jest.fn()
    };

    productServiceMock = {
      create: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: BrandService, useValue: brandServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('loadCategories', () => {
    it('should handle error when loading categories fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      categoryServiceMock.getAll.mockReturnValue(throwError(() => new Error('Error loading categories')));

      await component.loadCategories();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading categories:', expect.any(Error));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('createProduct', () => {
    it('should handle error when creating product fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockProduct: Product = {
        name: 'Product 1',
        description: 'Description of Product 1',
        price: 100,
        quantity: 10,
        brandId: 1,
        categoryIds: [1, 2]
      };
      productServiceMock.create.mockReturnValue(throwError(() => new Error('Error creating product')));

      await component.createProduct(mockProduct);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating product:', expect.any(Error));
      consoleErrorSpy.mockRestore();
    });
  });
});
