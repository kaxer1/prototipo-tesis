import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { LoginResp, permisosSistema, User, userDefault } from '../interfaces/user.iterface';
import { Menu, MenuNode } from '../interfaces/menu.model';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Message, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class DataCentralService {

  private SECRETE_KEY = 'token_esfot_epn';
  // url para conexion a la api
  private API_URL = environment.url_base_proxy;

  // Variables del usuario y que se usa en todo el sistema.
  private dataUserLocal: User;
  public get user(): User { return this.dataUserLocal };

  // variables que mantienen la inforamcion del menu que viene de la BDD con roles y permisos
  private dataMenuLocal: Menu[] = [];
  public get menu(): Menu[] { return this.dataMenuLocal };

  // variables que ayudan a presentar la informacion del menu lateral
  private menuNodelocal: MenuNode[] = [];
  public get menuNode(): MenuNode[] { return this.menuNodelocal };

  // variables para manejar los permisos para cada transaccion o verificacion del menu de acuerdo al rol.
  private permisosSistema: permisosSistema = { crear: false, editar: false, elminar: false };
  public get permisos(): permisosSistema { return this.permisosSistema };

  // variable para manejar proceso de carga cuando realiza las peticiones. Para mostar ese dialogo.
  private loading: boolean;
  public get loadingDialog(): boolean { return this.loading };

  constructor(
    public messageService: MessageService,
    private router: Router,
    private http: HttpClient,
    // public dialog: MatDialog
  ) { }

  public dialogRef: any;
  public setLoading(value: boolean): void {
    this.loading = value;

    // if (this.loading === true) {
    //   this.dialogRef = this.dialog.open(LoadingComponent, { width: '200px' });
    // }

  }
  /**
   * Encripta los datos de respuesta al loguearse al sistema.
   * @param data Datos de respuesta al loguear un usuario
   */
  public encriptarData(data: LoginResp): void {
    
    const ciphertext = AES.encrypt(JSON.stringify(data.dto), this.SECRETE_KEY).toString(); // datos de usuario
    localStorage.setItem('d', ciphertext)
  }

  /**
   * Desencripta los datos del usuario para usarlos cuando el usuario esta logueado.
   */
  public desencriptarDataUser(): void {
    this.dataUserLocal = {} as User
    const d = localStorage.getItem('d');
    if (d === null) return;

    const bytes = AES.decrypt(d, this.SECRETE_KEY);
    this.dataUserLocal = JSON.parse(bytes.toString(enc.Utf8)) as User;
  }

  public validarToken() {
    if (localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
      return true;
    } 
    return false
  }

  public validarTokenRecuperacion() {
    if (localStorage.getItem('tokenRecuperacion') !== 'undefined' && localStorage.getItem('tokenRecuperacion') !== null && localStorage.getItem('tokenRecuperacion') !== '') {
      return true;
    } 
    return false
  }

  /**
   * Limpia los datos cuando sale de sesion.
   */
  public limpiarDataCentral(): void {
    this.dataUserLocal = userDefault;
    this.dataMenuLocal = [];
    this.menuNodelocal = [];
    this.permisosSistema = { crear: false, editar: false, elminar: false };
    localStorage.clear();
    sessionStorage.clear();
  }

  public mostrarmsgerror(msg: string, titulomsg = "Error"): void {
    this.messageService.add({ key: 'tst', severity: 'error', summary: titulomsg, detail: msg });
  }

  public mostrarmsgexito(msg: string, titulomsg = "Transacción exitosa"): void {
    this.messageService.add({ key: 'tst', severity: 'success', summary: titulomsg, detail: msg });
  }
  
  public mostrarmsginfo(msg: string, titulomsg = "Advertencia"): void {
    this.messageService.add({ key: 'tst', severity: 'info', summary: titulomsg, detail: msg });
  }

  /**
   * Consulta los datos del menu del rol que tiene el usuario logeado.
   */
  public ConsultarMenu() {
    this.dataMenuLocal = [] as any[]
    return this.http.get<any>(`${this.API_URL}/auth/menu`)
  }

  /**
   * es para manejar permisos en la ruta que esta
   */
  setPermisos(value: any) {
    this.permisosSistema = {
      crear: value.crear,
      editar: value.editar,
      elminar: value.eliminar
    }
  }


  /**
   * Llama a los menus de acurdo al rol del usuario.
   * @param menu Menu general descencriptado o enviodo desde la base de datos.
   */
  async setMenuRol(menu: any[]) {
    this.dataMenuLocal = [...menu];
    this.menuNodelocal = [];
    if (menu.length === 0) return;

    for (const m of this.dataMenuLocal) {
      const item = {
        name: m.nombre,
        icono: m.icon,
        children: (m.hijos.length === 0) ? [{ name: '', url: '/#' }] :
          m.hijos.filter(h => { return h.mostrarmenu === true })
            .map(h => {
              return { name: h.nombre, url: '/' + h.cruta }
            })
      }
      this.menuNodelocal.push(item)
    }
    if (menu[0].hijos.length === 0) return;

    let url = menu[0].hijos[0].cruta;
    this.router.navigate(["/" + url], { skipLocationChange: false });
  }


  /**
   * Metodo para eliminar registros de la base de datos.
   * @param idreg Id del registro
   * @param nametable nombre de la tabla referencia
   * @returns Observable de la peticion a la API
   */
  EliminarRegistro(idreg: string, nametable: string, pkatributo: string) {
    const params = new HttpParams()
      .set('nametable', nametable)
      .set('idreg', idreg)
      .set('pkatributo', pkatributo)
    return this.http.delete<any>(`${this.API_URL}/delete/registro`, { params })
  }

  /** ******************************************************************** *
   *                  MÉTODO PARA CONTROLAR INGRESO DE LETRAS              *
   *  ******************************************************************** */
  ingresarSoloLetras(e: any) {
    let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toString();
    // SE DEFINE TODO EL ABECEDARIO QUE SE VA A USAR.
    let letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    // ES LA VALIDACIÓN DEL KEYCODES, QUE TECLAS RECIBE EL CAMPO DE TEXTO.
    let especiales = [8, 37, 39, 46, 6, 13, 32];
    let tecla_especial = false
    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      this.messageService.add({ key: 'tst', severity: 'info', summary: "Usar solo letras", detail: "No se admite datos numéricos" });
      return false;
    }
    return true;
  }

  /** ******************************************************************** *
   *                  MÉTODO PARA CONTROLAR INGRESO DE NÚMEROS             *
   *  ******************************************************************** */
  IngresarSoloNumeros(evt) {
    if (window.event) {
      var keynum = evt.keyCode;
    }
    else {
      keynum = evt.which;
    }
    // COMPROBAMOS SI SE ENCUENTRA EN EL RANGO NUMÉRICO Y QUE TECLAS NO RECIBIRÁ.
    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 6) {
      return true;
    }
    else {
      this.messageService.add({ key: 'tst', severity: 'info', summary: "Usar solo números", detail: "No se admite el ingreso de letras" });
      return false;
    }
  }

}
