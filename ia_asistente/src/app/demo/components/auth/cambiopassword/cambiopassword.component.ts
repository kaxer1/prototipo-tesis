import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/plataforma/service/login/login.service';
import { SHA256 } from 'crypto-js';

@Component({
    selector: 'app-cambiopassword',
    templateUrl: './cambiopassword.component.html',
})
export class CambioPasswordComponent implements OnInit {

    @ViewChild('formReg', { static: true }) form: NgForm;
    
    conToken = false; 

    mostrarEmail = true;

    esCambiarContrasenia = false;

    public registro: any = {};

    constructor( public loginService: LoginService, private route: ActivatedRoute ) {}

    ngOnInit() {
        this.route.queryParamMap.subscribe( (p:any) => {
            const token = p['params']['token'];
            if (token == undefined || token == null) {
                this.conToken = false;
                this.mostrarEmail = true;
                this.esCambiarContrasenia = false;
            } else {
                this.conToken = true;
                this.mostrarEmail = false;
                this.esCambiarContrasenia = true;
                localStorage.setItem('token', token);
            }
        })
    }

    cambiarPassword() {
        if (this.registro.passwordtemp == undefined || this.registro.passwordtemp == null || this.registro.passwordtemp == "") {
            return this.loginService.dcentral.mostrarmsgerror("Ingrese contraseña temporal del email");
        }
        if (this.registro.nuevopassword == undefined || this.registro.nuevopassword == null || this.registro.nuevopassword == "") {
            return this.loginService.dcentral.mostrarmsgerror("Ingrese nuevoa contraseña");
        }
        if (this.registro.confirmarpassword == undefined || this.registro.confirmarpassword == null || this.registro.confirmarpassword == "") {
            return this.loginService.dcentral.mostrarmsgerror("Ingrese confirmación de contraseña");
        }
        if (this.registro.confirmarpassword != this.registro.nuevopassword) {
            return this.loginService.dcentral.mostrarmsgerror("Las contraseñas no son iguales");
        }

        let data = {
            passwordtemp: SHA256(this.registro.passwordtemp).toString(),
            nuevopassword: SHA256(this.registro.nuevopassword).toString()
        }
        this.loginService.confirmarCambioPassword(data).subscribe(resp => {
            this.esCambiarContrasenia = false;
            this.successResponse(resp);
        });
    }

    private successResponse(res) {
        this.loginService.dcentral.encriptarData(res);
        this.loginService.dcentral.desencriptarDataUser();
        this.loginService.guardarToken();
    }

    validarEmail() {
        if (this.registro.email == undefined || this.registro.email == null || this.registro.email == "") {
            return this.loginService.dcentral.mostrarmsgerror("Ingrese el email");
        }
        this.loginService.validarEmail(this.registro.email).subscribe(resp => {
            this.mostrarEmail = false;
        });
    }

}