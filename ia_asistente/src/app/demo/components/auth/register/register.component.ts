import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginService } from 'src/app/plataforma/service/login/login.service';
import { SHA256 } from 'crypto-js';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    @ViewChild('formReg', { static: true }) form: NgForm;
    
    mostrarRegistro = true;

    public registro: any = {};
    
    constructor(
        public loginService: LoginService,
        public layoutService: LayoutService
    ) {}

    registrarUsuario() {
        let clave = SHA256( this.registro.password ).toString();
    
        let dataUsuario = {
            email: this.registro.email,
            password: clave,
            username: this.registro.username,
            nombres: this.registro.nombres,
            apellidos: this.registro.apellidos,
            celular: this.registro.celular,
        };
    
        this.loginService.singin(dataUsuario).subscribe(res => {
            this.mostrarRegistro = false;
          
        })
    }

}
