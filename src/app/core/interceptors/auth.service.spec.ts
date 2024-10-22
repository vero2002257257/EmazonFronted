import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authInterceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthInterceptor,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authInterceptor = TestBed.inject(AuthInterceptor);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the interceptor', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should add Authorization header if the URL is not in noAuthUrls', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${authInterceptor.authToken}`);
    req.flush({});
  });

  it('should not add Authorization header for URLs in noAuthUrls', () => {
    httpClient.get('/categories/paged').subscribe();

    const req = httpMock.expectOne('/categories/paged');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
    req.flush({});
  });

  it('should handle requests even without a token', () => {
    // Realiza una solicitud a una URL que esté en `noAuthUrls`
    httpClient.get('/categories/paged').subscribe();
  
    // Espera una solicitud a esa URL y verifica que no tenga el encabezado `Authorization`
    const req = httpMock.expectOne('/categories/paged');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
    req.flush({});
  });
  

  it('should not modify the original request if it is in noAuthUrls', () => {
    httpClient.get('/categories/paged').subscribe();

    const req = httpMock.expectOne('/categories/paged');
    expect(req.request.headers.keys().length).toBe(0); // No headers should be added
    req.flush({});
  });

  it('should pass through all HTTP methods', () => {
    httpClient.post('/test', { data: 'example' }).subscribe();
    const postReq = httpMock.expectOne('/test');
    expect(postReq.request.method).toBe('POST');
    expect(postReq.request.headers.has('Authorization')).toBeTruthy();
    postReq.flush({});

    httpClient.put('/test', { data: 'example' }).subscribe();
    const putReq = httpMock.expectOne('/test');
    expect(putReq.request.method).toBe('PUT');
    expect(putReq.request.headers.has('Authorization')).toBeTruthy();
    putReq.flush({});

    httpClient.delete('/test').subscribe();
    const deleteReq = httpMock.expectOne('/test');
    expect(deleteReq.request.method).toBe('DELETE');
    expect(deleteReq.request.headers.has('Authorization')).toBeTruthy();
    deleteReq.flush({});
  });
});
