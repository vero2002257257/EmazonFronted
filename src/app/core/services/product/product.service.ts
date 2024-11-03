import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
}