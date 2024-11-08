import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EndpointsService } from '../../service/api/endpoints.service';
import { AssistantCreated, FileVectorStorage, ModelsOpenAI } from '../../interfaces/openAI.interface';
import { NgForm } from '@angular/forms';
import { CrudEntidad } from '../../shared/crud.component';
import { Asistente } from '../../interfaces/asistente.interface';

@Component({
    templateUrl: './asistente.component.html'
})
export class AsistenteComponent implements OnInit, AfterViewInit, CrudEntidad<Asistente> {

    @ViewChild('formReg', { static: true }) form: NgForm;

    models: ModelsOpenAI[] = [];

    private fileDataVector: FileVectorStorage;
    private assistantCreated: AssistantCreated;

    selectedFile: File | null = null;

    public registro: any = {};

    lregistros: Asistente[] = [];

    public componente: any = null;

    constructor(public endpoint: EndpointsService) {
        this.componente = this;
    }
    
    ngOnInit() {
        this.endpoint.dcentral.desencriptarDataUser();
        this.endpoint.getGenerico<ModelsOpenAI[]>("/chatbot/openai/lista-models").subscribe(resp => {
            this.models = resp;
        })
    }

    ngAfterViewInit(): void {
        this.consultar();
    }

    consultar() {
        const idusuario = this.endpoint.dcentral.user.idusuario;
        this.endpoint.getGenerico<any>(`/asistente/buscar-asistentes/${idusuario}`).subscribe(resp => {
            this.lregistros = resp.lista as Asistente[];
        });
    }
    crearNuevo() {
        throw new Error('Method not implemented.');
    }
    actualizar() {
        throw new Error('Method not implemented.');
    }
    eliminar() {
        throw new Error('Method not implemented.');
    }
    seleccionarRegistro(reg: Asistente) {
        console.log(reg);
    }

    onSelect(event: any) {
        this.selectedFile = event.files[0];

        const formData = new FormData();
        formData.append('file', this.selectedFile, this.selectedFile.name);

        this.endpoint.postFiles<FileVectorStorage>("/chatbot/openai/upload-file", formData).subscribe(resp => {
            this.fileDataVector = resp;
            this.guardarArchivoSubido();
        })
    }

    private guardarArchivoSubido() {
        
        const data = {
            idusuario: this.endpoint.dcentral.user.idusuario,
            idvector: this.fileDataVector.id,
            vectorstoreid: this.fileDataVector.vector_store_id,
            nombrevector: this.selectedFile.name.split(".")[0] + "-Storages"
        }
        this.endpoint.postGenerico("/asistente/guardar-archivo", data).subscribe(resp => {

        });
    }

    guardar() {
        if (this.selectedFile == null) {
            return this.endpoint.dcentral.mostrarmsgerror("Suba un archivo antes de guardar");
        }
        const {name, instructions, model} = this.registro;
        const data = {
            instructions,
            name,
            tools: [{ type: "file_search" }],
            tool_resources: {
              file_search: {
                vector_store_ids: [this.fileDataVector.vector_store_id]
              }
            },
            model: model.id
        };
        this.endpoint.postGenerico<AssistantCreated>("/chatbot/openai/create-assistant-by-user", data).subscribe(resp => {
            this.assistantCreated = resp;
            this.guardarAsistenteCreado();
        });
    }

    private guardarAsistenteCreado() {
        
        const data = {
            idusuario: this.endpoint.dcentral.user.idusuario,
            name: this.assistantCreated.name,
            description: this.assistantCreated.description,
            instructions: this.assistantCreated.instructions,
            model: this.assistantCreated.model,
            vectorstoreid: this.assistantCreated.tool_resources.file_search.vector_store_ids[0],
            idasistente: this.assistantCreated.id
        }
        this.endpoint.postGenerico("/asistente/guardar-asistente", data).subscribe(resp => {

        });
    }
}
