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
    const categoryData = { id : 1, name: 'Books', description: 'A category for books' };

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
    const categoryData = {id : 1, name: 'Invalid', description: 'Category causing error' };

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
    const categoryData = { id : 1, name: 'Another', description: 'Another category' };

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
    const categoryData = {id : 1, name: 'ErrorCategory', description: 'Invalid data' };
  
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
    const categoryData = { id : 1, name: 'NonExistentCategory', description: 'This category does not exist' };
  
    service.create(categoryData).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        expect(error.message).toContain(CATEGORY_CREATE_ERROR);
      },
    });
  
    const req = httpMock.expectOne(`${service['url']}`);
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });
  it('should clear the cache', () => {
    service.clearCache();
    expect(service['cache'].size).toBe(0);
  });

  it('should use cached data for getPagedCategories', () => {
    const cacheKey = 'paged_3_4';
    const cachedResponse = { content: [], totalPages: 1 };
    service['cache'].set(cacheKey, cachedResponse);

    service.getPagedCategories().subscribe((response) => {
      expect(response).toEqual(cachedResponse);
    });

    httpMock.expectNone(`${service['url']}paged?page=3&size=4`);
  });

  it('should use cached data for getCategoriesPaged', () => {
    const cacheKey = 'paged_1_5_name_asc';
    const cachedResponse = { content: [], totalPages: 1 };
    service['cache'].set(cacheKey, cachedResponse);

    service.getCategoriesPaged(1, 5, 'name', 'asc').subscribe((response) => {
      expect(response).toEqual(cachedResponse);
    });

    httpMock.expectNone(`${service['url']}paged?page=1&size=5&sort=name,asc`);
  });

  it('should handle error when getPagedCategories fails', () => {
    service.getPagedCategories().subscribe({
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpMock.expectOne(`${service['url']}paged?page=3&size=4`);
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle error when getCategoriesPaged fails', () => {
    service.getCategoriesPaged(1, 5, 'name', 'asc').subscribe({
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpMock.expectOne(`${service['url']}paged?page=1&size=5&sort=name,asc`);
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should not use cache if cache is cleared', () => {
    const cacheKey = 'paged_1_5_name_asc';
    const cachedResponse = { content: [], totalPages: 1 };
    service['cache'].set(cacheKey, cachedResponse);

    service.clearCache();

    service.getCategoriesPaged(1, 5, 'name', 'asc').subscribe((response) => {
      expect(response).not.toEqual(cachedResponse);
    });

    const req = httpMock.expectOne(`${service['url']}paged?page=1&size=5&sort=name,asc`);
    req.flush({ content: [], totalPages: 1 });
  });
  afterEach(() => {
    httpMock.verify();
  });
});