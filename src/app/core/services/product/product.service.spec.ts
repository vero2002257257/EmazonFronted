import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../core/models/product.models';
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
});