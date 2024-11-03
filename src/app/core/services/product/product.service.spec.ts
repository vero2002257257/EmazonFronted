import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../core/models/product.model';
import { ToastService } from '../../../core/services/toast.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let toastService: jest.Mocked<ToastService>;

  beforeEach(() => {
    const toastSpy = {
      success: jest.fn(),
      error: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductService,
        HttpClient,
        { provide: ToastService, useValue: toastSpy, }
      ]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService) as jest.Mocked<ToastService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a product successfully', () => {
    const productData: Product = { name: 'Product 1', description: 'Description', quantity: 1, price: 10, brandId: 1, categoryIds: [1] };
    service.create(productData).subscribe(result => {
      expect(result).toBeTruthy();
      expect(toastService.toastMessages$).toHaveBeenCalledWith('Product created successfully');
    });

    const req = httpMock.expectOne('http://localhost:9090/products/');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true });
  });

  it('should handle error when creating a product', () => {
    const productData: Product = { name: 'Product 1', description: 'Description', quantity: 1, price: 10, brandId: 1, categoryIds: [1] };
    service.create(productData).subscribe(result => {
      expect(result).toBeFalsy();
      expect(toastService.toastMessages$).toHaveBeenCalledWith('Error creating product');
    });

    const req = httpMock.expectOne('http://localhost:9090/products/');
    expect(req.request.method).toBe('POST');
    req.flush({ success: false }, { status: 500, statusText: 'Server Error' });
  });
});