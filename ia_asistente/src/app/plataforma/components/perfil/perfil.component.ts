import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EndpointsService } from '../../service/api/endpoints.service';
import { AssistantCreated, FileVectorStorage, ModelsOpenAI } from '../../interfaces/proceso.interface';
import { NgForm } from '@angular/forms';
import { UsuarioDetalleResp } from '../../interfaces/response.interface';

@Component({
    templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit, AfterViewInit {

    @ViewChild('formReg', { static: true }) form: NgForm;

    public registro: any = {};

    constructor(public endpoint: EndpointsService) { }

    
    ngOnInit() {
        this.endpoint.dcentral.desencriptarDataUser();
    }

    ngAfterViewInit(): void {
        this.buscarUsuario();
    }

    buscarUsuario() {
        
        const idusuario = this.endpoint.dcentral.user.idusuario;
        this.endpoint.getGenerico<UsuarioDetalleResp>(`/usuarios/buscarporid/${idusuario}`, null, {mostrarMsg: false}).subscribe(resp => {
            this.registro = resp.dto
        });
    }

    actualizarUsuario() {
        let data = {
            username: this.registro.username,
            password: this.registro.observacion
        };

        this.endpoint.postGenerico<any>(`/usuarios/actualizar-perfil`,data).subscribe(resp => {
            // this.registro = resp.dto
        });
    }
}
