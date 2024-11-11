import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataCentralService } from '../data-central.service';
import { Observable, catchError, map, finalize } from 'rxjs';
import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(
    private http: HttpClient,
    public router: Router,
    public dcentral: DataCentralService,
    private loadingService: LoadingService
  ) { }

  /**Manejo de respuesta de la base de datos cuando existe un error */
  private handleError(error: any) {
    return Promise.reject(error);
  }

  public getGenerico<T>(url: string, ObjectParams: any = null, { msgExito, mostrarMsg, loading}: Params = { msgExito: "Éxito", mostrarMsg: true, loading: true }) {
    this.dcentral.messageService.clear(); // limpia el mensaje
    this.validacionMostrarLoading(loading);

    let headersc = new HttpHeaders();
    headersc = headersc.set('Content-Type', 'application/json');
    headersc = headersc.set('accept', '*/*');

    let params: HttpParams = new HttpParams();
    if (ObjectParams != null) {
        Object.keys(ObjectParams).map(key => {
            if (ObjectParams[key] != null || ObjectParams[key] != undefined) {
                params = params.set(key, ObjectParams[key]);
            }
        });
    }

    const urlCompleta = environment.url_base_proxy + url;

    return this.http.get<T>(urlCompleta, { observe: 'response', headers: headersc, params })
        .pipe(
          map(resp => {
                  
            const r = resp.body;
            if (resp.headers.get('Authorization') != null && resp.headers.get('Authorization') !== '') {
                localStorage.setItem('token', resp.headers.get('Authorization'));
            }
            if (mostrarMsg) {
              this.dcentral.mostrarmsgexito(msgExito)
            }
            return r;
          }),
          catchError(error => {  
            this.dcentral.mostrarmsgexito(error);
            return this.handleError(error);
          }),
          finalize(() => this.loadingService.hide())
        );
  }

  /**Llamar al servicio rest */
  public postGenerico<T>(url: string, objeto: any, { msgExito, mostrarMsg, loading }: Params = { msgExito: "Éxito", mostrarMsg: true, loading: true }) {
    this.dcentral.messageService.clear(); // limpia el mensaje
    this.validacionMostrarLoading(loading);

    let rq = JSON.stringify(objeto);
    let headersc = new HttpHeaders();
    headersc = headersc.set('Content-Type', 'application/json');
    headersc = headersc.set('accept', '*/*');


    const urlCompleta = environment.url_base_proxy + url;

    return this.http.post<T>(urlCompleta, rq, { observe: 'response', headers: headersc })
        .pipe(
            map(resp => {
              
              const r: any = resp.body;
              if (resp.headers.get('Authorization') != null && resp.headers.get('Authorization') !== '') {
                localStorage.setItem('token', resp.headers.get('Authorization'));
              }
              if (mostrarMsg) {
                this.dcentral.mostrarmsgexito(msgExito)
              }
              return r;
            }),
            catchError(error => {
              this.dcentral.mostrarmsgexito(error);
              return this.handleError(error);
            }),
            finalize(() => this.loadingService.hide())
        );
  }

  /**Llamar al servicio rest */
  public postFiles<T>(url: string, formData: FormData, { msgExito, mostrarMsg, loading }: Params = { msgExito: "Éxito", mostrarMsg: true, loading: true  }) {
    this.dcentral.messageService.clear(); // limpia el mensaje
    this.validacionMostrarLoading(loading);

    const urlCompleta = environment.url_base_proxy + url;

    return this.http.post<T>(urlCompleta, formData)
        .pipe(
            map(resp => {
              
              const r: any = resp;
              
              if (mostrarMsg) {
                this.dcentral.mostrarmsgexito(msgExito)
              }
              return r;
            }),
            catchError(error => {
              this.dcentral.mostrarmsgexito(error);
              return this.handleError(error);
            }),
            finalize(() => this.loadingService.hide())
        );
  }


  public downloadFile(url: string, ObjectParams: any = null, msgexito = "Descargado con exito", loading = true): Observable<Blob> {
    this.dcentral.messageService.clear(); // limpia el mensaje
    this.validacionMostrarLoading(loading);

    let headersc = new HttpHeaders();
    headersc = headersc.set('Content-Type', 'application/json');
    headersc = headersc.set('accept', '*/*');

    let params: HttpParams = new HttpParams();
    if (ObjectParams != null) {
        Object.keys(ObjectParams).map(key => {
            if (ObjectParams[key] != null || ObjectParams[key] != undefined) {
                params = params.set(key, ObjectParams[key]);
            }
        });
    }

    const urlCompleta = environment.url_base_proxy + url;

    return this.http.get(urlCompleta, { responseType: 'blob', headers: headersc, params })
        .pipe(
          map(resp => {
                  
            const url = window.URL.createObjectURL(resp);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'instaldor.zip'; // Nombre del archivo para la descarga
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            this.dcentral.mostrarmsgexito(msgexito)
            return resp;
          }),
          catchError(error => {  
            this.dcentral.mostrarmsgexito(error);
            return this.handleError(error);
          }),
          finalize(() => this.loadingService.hide())
        );
  }

  private validacionMostrarLoading(value: boolean) {
    if (value) {
      this.loadingService.show();
    }
  }

}
