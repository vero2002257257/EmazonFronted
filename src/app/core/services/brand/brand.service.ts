import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Brand } from '../../models/brand-model';
import { BRAND_CREATED_SUCCESSFULLY, BRAND_CREATE_ERROR, TOAST_STATE } from '../../../shared/utils/constans/services-constans';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private url: string;

  constructor(private http: HttpClient, private toast: ToastService) {
    this.url = `${environment.stockApiUrl}brands/`;
  }

  create(brandData: Brand): Observable<boolean> {
    return this.http.post(this.url, brandData).pipe(
      map(() => {
        this.toast.showToast({
          type: TOAST_STATE.success,
          text: BRAND_CREATED_SUCCESSFULLY
        });
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        const errorMessage = err.error?.message
          ? `${BRAND_CREATE_ERROR}: ${err.error.message}`
          : BRAND_CREATE_ERROR;
        this.toast.showToast({
          type: TOAST_STATE.error,
          text: errorMessage
        });
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}