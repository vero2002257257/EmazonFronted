import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { environment } from '../../../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { Category } from '../../models/category.models';
import { CATEGORY_CREATED_SUCCESSFULLY, CATEGORY_CREATE_ERROR, TOAST_STATE } from '../../../shared/utils/constans/services-constans';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url: string;
  private cache: Map<string, any> = new Map();

  constructor(private http: HttpClient, private toast: ToastService) {
    this.url = `${environment.stockApiUrl}categories/`;
  }

  // Método para crear una categoría
  create(categoryData: Category): Observable<boolean> {
    return this.http.post(this.url, categoryData).pipe(
      map(() => {
        this.toast.showToast({
          type: TOAST_STATE.success,
          text: CATEGORY_CREATED_SUCCESSFULLY,
        });
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message
          ? `${CATEGORY_CREATE_ERROR}: ${err.error.message}`
          : CATEGORY_CREATE_ERROR;
        this.toast.showToast({
          type: TOAST_STATE.error,
          text: errorMessage,
        });
        return throwError(() => new Error(errorMessage));
      })
    );
  }

   // Método para obtener todas las categorías
   getAll(): Observable<Category[]> {
    const cacheKey = 'allCategories';
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<Category[]>(this.url).pipe(
      map((categories) => {
        this.cache.set(cacheKey, categories);
        return categories;
      }),
      catchError((error: HttpErrorResponse) => {
        this.toast.showToast({
          type: TOAST_STATE.error,
          text: 'Failed to load categories',
        });
        return throwError(() => new Error('Failed to load categories'));
      }),
      shareReplay(1) // Compartir la respuesta entre múltiples suscriptores.
    );
  }



  // Método para obtener categorías paginadas con caché
  getPagedCategories(page: number = 3, size: number = 4): Observable<any> {
    const cacheKey = `paged_${page}_${size}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    return this.http.get<any>(`${this.url}paged?page=${page}&size=${size}`).pipe(
      map((response) => {
        this.cache.set(cacheKey, response);
        return response;
      }),
      shareReplay(1) // Comparte la respuesta entre múltiples suscriptores.
    );
  }

  

  // Método para obtener categorías paginadas con ordenamiento, usando caché
  getCategoriesPaged(
    page: number,
    size: number,
    sortField: string,
    sortOrder: string
  ): Observable<any> {
    const cacheKey = `paged_${page}_${size}_${sortField}_${sortOrder}`;
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }
    const params = `?page=${page}&size=${size}&sort=${sortField},${sortOrder}`;
    return this.http.get<any>(`${this.url}paged${params}`).pipe(
      map((response) => {
        this.cache.set(cacheKey, response);
        return response;
      }),
      shareReplay(1)
    );
  }

  // Método para limpiar la caché si es necesario
  clearCache(): void {
    this.cache.clear();
  }
}