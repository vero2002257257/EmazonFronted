import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { ToastService } from '../toast.service';
import { environment } from '../../../../environments/environment';
import { Brand } from '../../models/brand-model';
import { BRAND_CREATED_SUCCESSFULLY, BRAND_CREATE_ERROR, TOAST_STATE } from '../../../shared/utils/constans/services-constans';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService, ToastService],
    });

    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a brand successfully', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const brandData: Brand = {id : 1, name: 'Nike', description: 'A brand for sportswear' };

    service.create(brandData).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${service['url']}`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TOAST_STATE.success,
        text: BRAND_CREATED_SUCCESSFULLY,
      })
    );
  });

  it('should handle network error when creating a brand', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const brandData: Brand = {id : 1, name: 'Invalid', description: 'Brand causing error' };

    service.create(brandData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(BRAND_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.error(new ErrorEvent('Network error'));

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TOAST_STATE.error,
        text: `${BRAND_CREATE_ERROR}`,
      })
    );
  });

  it('should handle server error with specific message', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const brandData: Brand = {id : 1, name: 'Another', description: 'Another brand' };

    service.create(brandData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(`${BRAND_CREATE_ERROR}: Server is down`);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({ message: 'Server is down' }, { status: 500, statusText: 'Internal Server Error' });

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TOAST_STATE.error,
        text: `${BRAND_CREATE_ERROR}: Server is down`,
      })
    );
  });

  it('should handle 400 error when creating a brand', () => {
    const brandData: Brand = {id : 1, name: 'ErrorBrand', description: 'Invalid data' };

    service.create(brandData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(BRAND_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({}, { status: 400, statusText: 'Bad Request' });
  });

  it('should handle 404 error when creating a brand', () => {
    const brandData: Brand = {id : 1, name: 'NonExistentBrand', description: 'This brand does not exist' };

    service.create(brandData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(BRAND_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });

  it('should handle 409 error when creating a brand', () => {
    const brandData: Brand = {id : 1, name: 'ConflictBrand', description: 'This brand already exists' };

    service.create(brandData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(BRAND_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({}, { status: 409, statusText: 'Conflict' });
  });

  it('should handle 500 error when creating a brand', () => {
    const brandData: Brand = {id : 1, name: 'ServerErrorBrand', description: 'Server error' };

    service.create(brandData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(BRAND_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should return cached data if available', () => {
    const cacheKey = 'paged_3_4';
    const cachedResponse = { content: [], totalPages: 1 };
    service['cache'].set(cacheKey, cachedResponse);
  
    service.getPagedBrands(3, 4).subscribe(response => {
      expect(response).toBe(cachedResponse);
    });
  });

  it('should return cached data with sorting if available', () => {
    const cacheKey = 'paged_3_4_name_asc';
    const cachedResponse = { content: [], totalPages: 1 };
    service['cache'].set(cacheKey, cachedResponse);
  
    service.getBrandsPaged(3, 4, 'name', 'asc').subscribe(response => {
      expect(response).toBe(cachedResponse);
    });
  });

  it('should fetch paged brands if not cached', () => {
    const page = 1;
    const size = 10;
    const response = { content: [], totalPages: 1 };

    service.getPagedBrands(page, size).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service['url']}paged?page=${page}&size=${size}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should fetch paged brands with sorting if not cached', () => {
    const page = 1;
    const size = 10;
    const sortField = 'name';
    const sortOrder = 'asc';
    const response = { content: [], totalPages: 1 };

    service.getBrandsPaged(page, size, sortField, sortOrder).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${service['url']}paged?page=${page}&size=${size}&sort=${sortField},${sortOrder}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should clear the cache', () => {
    service['cache'].set('test_key', 'test_value');
    service.clearCache();
    expect(service['cache'].size).toBe(0);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });
});