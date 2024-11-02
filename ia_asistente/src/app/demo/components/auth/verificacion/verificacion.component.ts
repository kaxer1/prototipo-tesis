import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/plataforma/service/login/login.service';

@Component({
    selector: 'app-verificacion',
    template: ``,
})
export class VerificacionComponent implements OnInit {
    
    @ViewChild('formReg', { static: true }) form: NgForm;

    public registro: any = {};
    
    constructor( public loginService: LoginService, private route: ActivatedRoute ) {}

    ngOnInit() {
        this.route.queryParamMap.subscribe( (p:any) => {
            const token = p['params']['token'];
            if (token == undefined || token == null) {
                this.loginService.router.navigate(['/']);
            } else {
                this.loginVerificado(token);
            }
        })
    }

    private loginVerificado(token: string) {
        localStorage.setItem('token', token);
        this.loginService.cuentaverificada().subscribe(resp => {
            this.loginService.setTokenMemoria(token);
            this.successResponse(resp);
        });
    }

    private successResponse(res) {
        this.loginService.dcentral.encriptarData(res);
        this.loginService.dcentral.desencriptarDataUser();
        this.loginService.guardarToken();
    }
    
}
