import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/plataforma/service/login/login.service';
import { SHA256 } from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    @ViewChild('formReg', { static: true }) form: NgForm;

    public registro: any = {};
    
    constructor( public loginService: LoginService ) {}

    iniciarSession() {
        let clave = SHA256( this.registro.password ).toString();
    
        let dataUsuario = {
            serial: uuidv4(),
            email: this.registro.email,
            password: clave
        };
    
        this.loginService.login(dataUsuario).subscribe(res => {
    
          if (res.codigo === "ERROR") {
            return;
          }
          this.SuccessResponse(res);
    
        })
    }

    SuccessResponse(res) {
        this.loginService.logout();
        this.loginService.dcentral.encriptarData(res);
        this.loginService.dcentral.desencriptarDataUser(); // es necesario para actualizacion rapida de los datos en el sistema.
        this.loginService.guardarToken();
        // this.loginService.dcentral.setMenuRol(res.menu); 
    }

    irregistrase() {
        
        this.loginService.router.navigate(["/auth/registrar"], { skipLocationChange: false });
        
    }

}
