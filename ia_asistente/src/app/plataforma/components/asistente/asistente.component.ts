import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EndpointsService } from '../../service/api/endpoints.service';
import { ModelsOpenAI } from '../../interfaces/openAI.interface';
import { NgForm } from '@angular/forms';
import { CrudEntidad } from '../../shared/crud.interface';
import { Asistente } from '../../interfaces/asistente.interface';
import { CrudComponente } from '../../shared/crud.component';

@Component({
    templateUrl: './asistente.component.html'
})
export class AsistenteComponent extends CrudComponente<Asistente> implements OnInit, AfterViewInit, CrudEntidad<Asistente> {

    @ViewChild('formReg', { static: true }) form: NgForm;

    models: ModelsOpenAI[] = [];

    selectedFile: File | null = null;

    constructor(public endpoint: EndpointsService) {
        super();
        this.componente = this;
    }

    ngOnInit() {
        this.endpoint.dcentral.desencriptarDataUser();
    }

    ngAfterViewInit(): void {
        this.consultar();
    }

    consultar() {
        this.endpoint.getGenerico<ModelsOpenAI[]>("/asistente/lista-modelos").subscribe(resp => {
            this.models = resp;
        })
        const idusuario = this.endpoint.dcentral.user.idusuario;
        this.endpoint.getGenerico<any>(`/asistente/buscar-asistentes/${idusuario}`).subscribe(resp => {
            this.lregistros = resp.lista as Asistente[];
        });
    }
    
    crearNuevo() {
        super.crearNuevoReg();
    }

    actualizar() {
        const formData = new FormData();
        if (this.selectedFile != null) {
            formData.append('file', this.selectedFile, this.selectedFile.name);
        }
        formData.append('dto', new Blob([JSON.stringify(this.registro)], { type: 'application/json' }));

        this.endpoint.postFiles<Asistente>("/asistente/actualizar-asistente", formData).subscribe(resp => {
            super.procesaRespuestaAcciones(resp.dto as Asistente, 'id');
        })
    }

    eliminar(reg: Asistente) {
        this.endpoint.postGenerico<Asistente>(`/asistente/eliminar-asistente`, reg).subscribe(resp => {
            super.procesaRespuestaAcciones(resp.dto as Asistente, 'id');
        });
    }

    seleccionarRegistro(reg: Asistente) {
        super.seleccionarRegistroReg(reg);
        this.selectedFile = null;
    }

    onSelect(event: any) {
        this.selectedFile = event.files[0];
    }

    guardar() {
        if (this.selectedFile == null) {
            return this.endpoint.dcentral.mostrarmsgerror("Cargue un archivo antes de guardar");
        }
        
        const {name, instructions, model} = this.registro;
        const data = {
            id: null,
            idusuario: this.endpoint.dcentral.user.idusuario,
            name: name,
            description: "",
            instructions: instructions,
            model: model,
            vectorstoreid: null,
            idasistente: null
        }
        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);
        formData.append('dto', new Blob([JSON.stringify(data)], { type: 'application/json' }));

        this.endpoint.postFiles<Asistente>("/asistente/crear-asistente", formData).subscribe(resp => {
            super.procesaRespuestaNuevo(resp.dto as Asistente);
        })
    }

    
}
