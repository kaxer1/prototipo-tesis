import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/plataforma/service/login/login.service';
import { SHA256 } from 'crypto-js';

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

    valCheck: string[] = ['remember'];

    @ViewChild('formReg', { static: true }) form: NgForm;

    public registro: any = {};
    
    constructor(
        public loginService: LoginService,
        public layoutService: LayoutService
    ) {}

    iniciarSession() {
        console.log(this.form);
        
        let clave = SHA256( this.registro.password ).toString();
    
        let dataUsuario = {
            serial: "aafdfad61678432a819dbd079974cf",
            email: this.registro.email,
            password: clave
        };
    
        this.loginService.singin(dataUsuario).subscribe(res => {
    
          if (res.codigo === "ERROR") {
            return;
          }
          this.SuccessResponse(res);
    
        })
    }

    SuccessResponse(res) {
        // this.LoginService.logout();
        // this.dcentral.encriptarData(res);
        // this.dcentral.desencriptarDataUser(); // es necesario para actualizacion rapida de los datos en el sistema.
        // this.LoginService.setlogin(true);
        // this.dcentral.setMenuRol(res.menu); 
      }

}
