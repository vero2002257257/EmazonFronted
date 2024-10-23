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
    const brandData: Brand = { name: 'Nike', description: 'A brand for sportswear' };

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
    const brandData: Brand = { name: 'Invalid', description: 'Brand causing error' };

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
    const brandData: Brand = { name: 'Another', description: 'Another brand' };

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
    const brandData: Brand = { name: 'ErrorBrand', description: 'Invalid data' };

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
    const brandData: Brand = { name: 'NonExistentBrand', description: 'This brand does not exist' };

    service.create(brandData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(BRAND_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });
});