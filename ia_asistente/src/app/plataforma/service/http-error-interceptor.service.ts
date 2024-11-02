import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DataCentralService } from './data-central.service';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private dcentral: DataCentralService, private login: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this.dcentral.setLoading(false);

          let token = evt.headers.get("Authorization");
          if (token) {
            localStorage.setItem('token', token);
            this.login.setTokenMemoria(token);
          }

          if (evt.body && evt.body.codigo == "OK") {
            if (evt.body.mensaje !== "") {
              this.dcentral.mostrarmsgexito(evt.body.mensaje);
            }
          }
          if (evt.body && evt.body.codigo == "ERROR")
            this.dcentral.mostrarmsgerror(evt.body.mensaje);
        }
        return evt;
      }),
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Aplicacion error: ${error.error.message}`;
        } else if(error instanceof HttpErrorResponse) { 
          if (error.status == 404) {
            errorMessage = error.error.message;
          }
          if (error.status === 401) {
            errorMessage = `Servidor error: ${error.status} - ${error.message}`;
            this.login.logout()
          }
        } else {
          // backend error
          errorMessage = `Servidor error: ${error.status} - ${error.message}`;
          if (error.status === 401) {
            this.login.logout()
          }
        }

        // Muestra el mensaje de error.
        this.dcentral.mostrarmsgerror(errorMessage);
        this.dcentral.setLoading(false);
        return throwError(errorMessage);
      })
    );
  }
}