import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { ToastService } from '../toast.service';
import {
  CATEGORY_CREATED_SUCCESSFULLY,
  CATEGORY_CREATE_ERROR,
  TOAST_STATE,
} from '../../../shared/utils/constans/services-constans';
import { environment } from '../../../../environments/environment';
import { Category } from '../../models/category.models';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService, ToastService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a category successfully', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData: Category = {
      name: 'Books',
      description: 'A category for books',
    };

    service.create(categoryData).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${environment.stockApiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simula una respuesta exitosa.

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TOAST_STATE.success,
        text: CATEGORY_CREATED_SUCCESSFULLY,
      })
    );
  });

  it('should handle network error when creating a category', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData: Category = {
      name: 'Invalid',
      description: 'Category causing error',
    };

    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(CATEGORY_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiUrl}`);
    req.error(new ErrorEvent('Network error'));

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TOAST_STATE.error,
        text: CATEGORY_CREATE_ERROR,
      })
    );
  });

  it('should handle server error with specific message', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData: Category = {
      name: 'Another',
      description: 'Another category',
    };
    const serverErrorMessage = 'Server is down';

    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(`${CATEGORY_CREATE_ERROR}: ${serverErrorMessage}`);
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiUrl}`);
    req.flush(
      { message: serverErrorMessage },
      { status: 500, statusText: 'Internal Server Error' }
    );

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TOAST_STATE.error,
        text: `${CATEGORY_CREATE_ERROR}: ${serverErrorMessage}`,
      })
    );
  });

  it('should handle empty error response', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData: Category = {
      name: 'Empty Error',
      description: 'Testing empty error',
    };

    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toBe(CATEGORY_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${environment.stockApiUrl}`);
    req.flush(null, { status: 400, statusText: 'Bad Request' });

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: TOAST_STATE.error,
        text: CATEGORY_CREATE_ERROR,
      })
    );
  });
});
