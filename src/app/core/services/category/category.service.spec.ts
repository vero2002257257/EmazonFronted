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

  it('should create a category successfully', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData = { name: 'Books', description: 'A category for books' };

    service.create(categoryData).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${service['url']}`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        text: CATEGORY_CREATED_SUCCESSFULLY,
      })
    );
  });

  it('should handle network error when creating a category', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData = { name: 'Invalid', description: 'Category causing error' };

    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(CATEGORY_CREATE_ERROR);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.error(new ErrorEvent('Network error'));

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text: `${CATEGORY_CREATE_ERROR}`,
      })
    );
  });

  it('should handle server error with specific message', () => {
    const toastSpy = jest.spyOn(toastService, 'showToast');
    const categoryData = { name: 'Another', description: 'Another category' };

    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(`${CATEGORY_CREATE_ERROR}: Server is down`);
      },
    });

    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({ message: 'Server is down' }, { status: 500, statusText: 'Internal Server Error' });

    expect(toastSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'error',
        text: `${CATEGORY_CREATE_ERROR}: Server is down`,
      })
    );
  });

  it('should retrieve paged categories with sorting', () => {
    service.getCategoriesPaged(1, 5, 'name', 'asc').subscribe();
  
    const req = httpMock.expectOne(
      `${service['url']}paged?page=1&size=5&sort=name,asc`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ content: [], totalPages: 1 });
  });

  it('should handle 400 error when creating a category', () => {
    const categoryData = { name: 'ErrorCategory', description: 'Invalid data' };
  
    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(CATEGORY_CREATE_ERROR);
      },
    });
  
    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({}, { status: 400, statusText: 'Bad Request' });
  });
  
  it('should retrieve paged categories with descending sorting', () => {
    service.getCategoriesPaged(1, 5, 'name', 'desc').subscribe();
  
    const req = httpMock.expectOne(
      `${service['url']}paged?page=1&size=5&sort=name,desc`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ content: [], totalPages: 1 });
  });

  it('should retrieve paged categories with default parameters', () => {
    service.getPagedCategories().subscribe();
  
    const req = httpMock.expectOne(
      `${service['url']}paged?page=3&size=4`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ content: [], totalPages: 1 });
  });

  it('should retrieve paged categories with specific parameters', () => {
    service.getPagedCategories(2, 10).subscribe();
  
    const req = httpMock.expectOne(
      `${service['url']}paged?page=2&size=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush({ content: [], totalPages: 1 });
  });

  it('should handle 404 error when creating a category', () => {
    const categoryData = { name: 'NonExistentCategory', description: 'This category does not exist' };
  
    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(CATEGORY_CREATE_ERROR);
      },
    });
  
    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
