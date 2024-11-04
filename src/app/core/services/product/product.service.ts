import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TOAST_STATE } from '../../../shared/utils/constans/services-constans';
import { Product } from '../../models/product.models';
import { ToastService } from '../toast.service';
import  { environment } from '../../../../environments/environment';
const PRODUCT_CREATED_SUCCESSFULLY = 'Product created successfully';
const PRODUCT_CREATE_ERROR = 'Error creating product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = `${environment.stockApiUrl}products/`;
  private cache: Map<string, any> = new Map();
  constructor(private http: HttpClient, private toast: ToastService) { }

  create(productData: Product): Observable<boolean> {
    return this.http.post(this.url, productData).pipe(
      map(() => {
        this.toast.showToast({
          type: TOAST_STATE.success,
          text: PRODUCT_CREATED_SUCCESSFULLY,
        });
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message
          ? `${PRODUCT_CREATE_ERROR}: ${err.error.message}`
          : PRODUCT_CREATE_ERROR;
        this.toast.showToast({
          type: TOAST_STATE.error,
          text: errorMessage,
        });
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getAll(): Observable<Product[]> {
    return this.http.get<any[]>(this.url).pipe(
      map((products) =>
        products.map((product) => ({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          brandId: product.brand.id, // Extraer solo el ID de la marca
          categoryIds: product.categories.map((category: any) => category.id), // Extraer solo los IDs de las categorías
        }))
      ),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  // Método para obtener los productos paginados con cache y ordenación
  getPaginated(page: number, limit: number, sortBy: string, sortOrder: string): Observable<Product[]> {
    const cacheKey = `products-${page}-${limit}-${sortBy}-${sortOrder}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    return this.http.get<any[]>(this.url, { params }).pipe(
      map((products) => {
        const transformedProducts = products.map((product) => ({
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          brandId: product.brand.id, // Extraer solo el ID de la marca
          categoryIds: product.categories.map((category: any) => category.id), // Extraer solo los IDs de las categorías
        }));
        this.cache.set(cacheKey, transformedProducts);
        return transformedProducts;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}