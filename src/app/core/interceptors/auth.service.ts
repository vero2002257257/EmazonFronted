import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public authToken: string = 'your-token-here';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const noAuthUrls = ['/categories/paged'];

    // Verifica si la URL actual está en la lista de URLs sin autenticación
    const isNoAuthUrl = noAuthUrls.some(url => req.url.includes(url));

    if (isNoAuthUrl) {
      // Si es una URL sin autenticación, deja la solicitud sin modificar.
      return next.handle(req);
    }

    // Clonamos la solicitud y le añadimos el encabezado Authorization si es necesario
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authToken}`)
    });

    return next.handle(clonedRequest);
  }
}
