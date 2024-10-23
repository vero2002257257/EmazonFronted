import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Category } from '../../models/category.models';
import { CATEGORY_CREATED_SUCCESSFULLY, CATEGORY_CREATE_ERROR, TOAST_STATE } from '../../../shared/utils/constans/services-constans';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;

  constructor(private http: HttpClient, private toast: ToastService) {
    this.url = `${environment.stockApiUrl}`;
  }

  create(categoryData: Category): Observable<boolean> {
    return this.http.post(this.url, categoryData).pipe(
      map(() => {
        // Mostrar el mensaje de éxito
        this.toast.showToast({
          type: TOAST_STATE.success,
          text: CATEGORY_CREATED_SUCCESSFULLY
        });
        return true; 
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message 
          ? `${CATEGORY_CREATE_ERROR}: ${err.error.message}`
          : CATEGORY_CREATE_ERROR;
        
        // Mostrar el mensaje de error
        this.toast.showToast({
          type: TOAST_STATE.error,
          text: errorMessage
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
  // Método para obtener categorías paginadas
  getPagedCategories(page: number = 3, size: number = 4): Observable<any> {
    return this.http.get<any>(`${this.url}paged?page=${page}&size=${size}`);
  }

  getCategoriesPaged(page: number, size: number, sortField: string, sortOrder: string): Observable<any> {
    const params = `?page=${page}&size=${size}&sort=${sortField},${sortOrder}`;
    return this.http.get<any>(`${this.url}paged${params}`);
  }
}