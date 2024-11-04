import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModalComponent } from './table-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';
import { of, throwError } from 'rxjs';
import { Product } from '@src/app/core/models/product.models';

describe('TableModalComponent', () => {
  let component: TableModalComponent;
  let fixture: ComponentFixture<TableModalComponent>;
  let brandService: BrandService;
  let categoryService: CategoryService;
  let productService: ProductService;

  // Mock data con las propiedades correctas
  const mockBrands = [
    { id: 1, name: 'Brand 1', description: 'Description 1' },
    { id: 2, name: 'Brand 2', description: 'Description 2' }
  ];

  const mockCategories = [
    { id: 1, name: 'Category 1', description: 'Category Description 1' },
    { id: 2, name: 'Category 2', description: 'Category Description 2' }
  ];

  const mockProducts = [
    { id: 1, name: 'Product 1', brandId: 1, categoryIds: [1], price: 100, description: 'Product Description 1', quantity: 10 },
    { id: 2, name: 'Product 2', brandId: 2, categoryIds: [2], price: 200, description: 'Product Description 2', quantity: 20 },
    { id: 3, name: 'Product 3', brandId: 1, categoryIds: [1, 2], price: 300, description: 'Product Description 3', quantity: 30 },
    { id: 4, name: 'Product 4', brandId: 2, categoryIds: [], price: 400, description: 'Product Description 4', quantity: 40 },
    { id: 5, name: 'Product 5', brandId: 1, categoryIds: [2], price: 500, description: 'Product Description 5', quantity: 50 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableModalComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BrandService,
          useValue: {
            getAll: jest.fn().mockReturnValue(of(mockBrands))
          }
        },
        {
          provide: CategoryService,
          useValue: {
            getAll: jest.fn().mockReturnValue(of(mockCategories))
          }
        },
        {
          provide: ProductService,
          useValue: {
            getPaginated: jest.fn().mockReturnValue(of(mockProducts))
          }
        }
      ]
    }).compileComponents();

    brandService = TestBed.inject(BrandService);
    categoryService = TestBed.inject(CategoryService);
    productService = TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load brands on init', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.brands).toEqual(mockBrands);
      done();
    });
  });

  it('should load categories on init', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.categories).toEqual(mockCategories);
      done();
    });
  });

  it('should load products on init', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.products).toEqual(mockProducts);
      done();
    });
  });


  it('should paginate data correctly', () => {
    component.products = mockProducts;
    component.pageSize = 2;
    component.currentPage = 0;
    component['paginateData']();
    expect(component.paginatedProducts.length).toBe(2);
  });

  it('should change page correctly', () => {
    component.products = mockProducts;
    component.pageSize = 2;
    component.onPageChange(1);
    expect(component.currentPage).toBe(1);
  });

  it('should calculate total pages correctly', () => {
    component.products = mockProducts;
    component.pageSize = 2;
    expect(component.getTotalPages()).toBe(3);
  });

  it('should change sort order', () => {
    const event = { target: { value: 'desc' } } as unknown as Event;
    component.changeSortOrder(event);
    expect(component.sortOrder).toBe('desc');
  });

  it('should change sort field', () => {
    const event = { target: { value: 'name' } } as unknown as Event;
    component.changeSortBy(event);
    expect(component.sortField).toBe('name');
  });

  it('should sort products by name', () => {
    component.products = [...mockProducts];
    component.sortField = 'name';
    component.sortOrder = 'asc';
    component['sortData']();
    expect(component.products[0].name).toBe('Product 1');
  });

  it('should get brand name', () => {
    component.brands = mockBrands;
    expect(component.getBrandName(1)).toBe('Brand 1');
    expect(component.getBrandName(999)).toBe('Unknown');
  });

  it('should get category names', () => {
    component.categories = mockCategories;
    expect(component.getCategoryNames([1, 2])).toBe('Category 1, Category 2');
    expect(component.getCategoryNames([])).toBe('Unknown');
  });

  it('should emit close event', () => {
    const emitSpy = jest.spyOn(component.closeModalEvent, 'emit');
    component.closeModal();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should handle ngOnChanges', () => {
    const changes = {
      products: {
        currentValue: mockProducts,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    };
    component.ngOnChanges(changes);
    expect(component.paginatedProducts).toBeDefined();
  });
  describe('loadBrands', () => {
    it('should load brands successfully', () => {
      const mockBrands = [{ id: 1, name: 'Brand1' }, { id: 2, name: 'Brand2' }];
      (brandService.getAll as jest.Mock).mockReturnValue(of(mockBrands));

      component.loadBrands();

      expect(brandService.getAll).toHaveBeenCalled();
      expect(component.brands).toEqual(mockBrands);
    });

    it('should handle error when loading brands fails', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (brandService.getAll as jest.Mock).mockReturnValue(throwError(() => new Error('Error loading brands')));

      component.loadBrands();

      expect(consoleSpy).toHaveBeenCalledWith('Error loading brands:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('loadCategories', () => {
    it('should load categories successfully', () => {
      const mockCategories = [{ id: 1, name: 'Category1' }, { id: 2, name: 'Category2' }];
      (categoryService.getAll as jest.Mock).mockReturnValue(of(mockCategories));

      component.loadCategories();

      expect(categoryService.getAll).toHaveBeenCalled();
      expect(component.categories).toEqual(mockCategories);
    });

    it('should handle error when loading categories fails', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (categoryService.getAll as jest.Mock).mockReturnValue(throwError(() => new Error('Error loading categories')));

      component.loadCategories();

      expect(consoleSpy).toHaveBeenCalledWith('Error loading categories:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });

  describe('sortData', () => {
    it('should sort products by brand', () => {
      component.sortField = 'brand';
      component.sortOrder = 'asc';
      component.products = [
        { brandId: 2, name: 'Product B' } as Product,
        { brandId: 1, name: 'Product A' } as Product,
      ];
      component.brands = [
        { id: 1, name: 'Brand A', description: 'Description A' },
        { id: 2, name: 'Brand B', description: 'Description B' },
      ];

      component['sortData']();

      expect(component.products[0].brandId).toBe(1);
      expect(component.products[1].brandId).toBe(2);
    });

    it('should sort products by category', () => {
      component.sortField = 'category';
      component.sortOrder = 'desc';
      component.products = [
        { categoryIds: [1], name: 'Product A' } as Product,
        { categoryIds: [2], name: 'Product B' } as Product,
      ];
      component.categories = [
        { id: 1, name: 'Category A', description: 'Description A' },
        { id: 2, name: 'Category B', description: 'Description B' },
      ];

      component['sortData']();

      expect(component.products[0].categoryIds).toEqual([2]);
      expect(component.products[1].categoryIds).toEqual([1]);
    });

    it('should sort products by a given field', () => {
      component.sortField = 'name';
      component.sortOrder = 'asc';
      component.products = [
        { name: 'Z Product' } as Product,
        { name: 'A Product' } as Product,
      ];

      component['sortData']();

      expect(component.products[0].name).toBe('A Product');
      expect(component.products[1].name).toBe('Z Product');
    });

    it('should return 0 when values are equal', () => {
      component.sortField = 'name';
      component.sortOrder = 'asc';
      component.products = [
        { name: 'Same Product' } as Product,
        { name: 'Same Product' } as Product,
      ];

      const result = component['sortData']();
      expect(result).toBeUndefined();
      expect(component.products[0].name).toBe('Same Product');
      expect(component.products[1].name).toBe('Same Product');
    });
  });

  describe('loadProducts', () => {
    it('should load products successfully', () => {
      const mockProducts = [{ name: 'Product1' }, { name: 'Product2' }] as Product[];
      (productService.getPaginated as jest.Mock).mockReturnValue(of(mockProducts));

      component.loadProducts();

      expect(productService.getPaginated).toHaveBeenCalledWith(component.currentPage, component.itemsPerPage, component.sortBy, component.sortOrder);
      expect(component.products).toEqual(mockProducts);
      expect(component.totalItems).toBe(mockProducts.length);
    });

    it('should handle error when loading products fails', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (productService.getPaginated as jest.Mock).mockReturnValue(throwError(() => new Error('Error loading products')));

      component.loadProducts();

      expect(consoleSpy).toHaveBeenCalledWith('Error loading products:', expect.any(Error));
      consoleSpy.mockRestore();
    });
  });
});