import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginResp, User } from '../../interfaces/user.iterface';
import { DataCentralService } from '../data-central.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = environment.url_base_proxy;

  private tokenmemoria: string;

  public get user(): User {
    return this.dcentral.user
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    public dcentral: DataCentralService
  ) { }

  login(credenciales: any) {
    return this.http.post<LoginResp>(`${this.API_URL}/usuarios/autenticacion/login`, credenciales);
  }

  cuentaverificada() {
    return this.http.post<LoginResp>(`${this.API_URL}/usuarios/autenticacion/cuentaverificada`,{});
  }

  singin(reg: any) {
    return this.http.post(`${this.API_URL}/usuarios/autenticacion/registrarse`, reg);
  }

  validarEmail(email: string) {
    return this.http.post(`${this.API_URL}/usuarios/autenticacion/recuperarcontrasenia/${email}`,{});
  }
  
  confirmarCambioPassword(data: any) {
    return this.http.post<LoginResp>(`${this.API_URL}/usuarios/autenticacion/confirmarPassword`, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.router.navigate(["/auth/login"], { skipLocationChange: false }).finally(() => {
      location.reload()
    });
    this.dcentral.limpiarDataCentral();
  }

  setTokenMemoria(token: string) {
    this.tokenmemoria = token;
  }

  guardarToken() {
    localStorage.setItem('token', this.tokenmemoria);
    this.router.navigate(["/"], { skipLocationChange: false }).finally(() => {
      location.reload()
    });
  }

  /**
   * Metodos para recuperar contraseña.
   */
  
  getTokenRecuperacion() {
    return localStorage.getItem('tokenRecuperacion');
  }

  postSendEmail(dataFormulario:any) {
    return this.http.post<LoginResp>(`${this.API_URL}/auth/email`, dataFormulario);
  }

  postSendPassword(dataFormulario:any) {
    return this.http.post<LoginResp>(`${this.API_URL}/auth/recuperar`, dataFormulario);
  }

}
