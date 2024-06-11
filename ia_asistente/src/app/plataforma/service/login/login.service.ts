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

  API_URL = environment.url;

  public get user(): User {
    return this.dcentral.user
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    private dcentral: DataCentralService
  ) { }

  singin(credenciales: any) {
    return this.http.post<LoginResp>(`${this.API_URL}/usuarios/autenticacion/login`, credenciales);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedRol() {
    return (this.user.rol) ? true : false;
  }

  getRol() {
    return this.user.rol;//Empleado
  }

  logout() {
    this.setlogin(false);
    this.router.navigate(["/"], { skipLocationChange: false }).finally(() => {
      location.reload()
    });
    this.dcentral.limpiarDataCentral();
  }

  /**
   * Inicio de seccion.
   */
  private iniciar_login: boolean = false;
  public get login(): boolean {
    return this.iniciar_login
  }

  public setlogin(l : boolean) {
    this.iniciar_login = l;
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
