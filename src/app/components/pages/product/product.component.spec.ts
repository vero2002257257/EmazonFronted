import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModalComponent } from '../../organisms/table-modal/table-modal.component';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';
import { of, throwError } from 'rxjs';
import { Product } from '../../../core/models/product.models';
import { NO_ERRORS_SCHEMA } from '@angular/core';

jest.mock('../../../core/services/brand/brand.service');
jest.mock('../../../core/services/category/category.service');
jest.mock('../../../core/services/product/product.service');

describe('TableModalComponent', () => {
  let component: TableModalComponent;
  let fixture: ComponentFixture<TableModalComponent>;
  let brandService: jest.Mocked<BrandService>;
  let categoryService: jest.Mocked<CategoryService>;
  let productService: jest.Mocked<ProductService>;

  beforeEach(async () => {
    brandService = {
      getAll: jest.fn()
    } as unknown as jest.Mocked<BrandService>;

    categoryService = {
      getAll: jest.fn()
    } as unknown as jest.Mocked<CategoryService>;

    productService = {
      getPaginated: jest.fn()
    } as unknown as jest.Mocked<ProductService>;

    await TestBed.configureTestingModule({
      declarations: [TableModalComponent],
      providers: [
        { provide: BrandService, useValue: brandService },
        { provide: CategoryService, useValue: categoryService },
        { provide: ProductService, useValue: productService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TableModalComponent);
    component = fixture.componentInstance;
  });

  // Other test cases...

  it('should return 0 when sorting values are equal', () => {
    component.sortField = 'name';
    component.sortOrder = 'asc';
    component.products = [
      { name: 'Product A' } as Product,
      { name: 'Product A' } as Product,
    ];

    // Call sortData indirectly through fixture changes or directly if made public
    (component as any).sortData();
    expect(component.products[0].name).toBe('Product A');
    expect(component.products[1].name).toBe('Product A');
  });
});
