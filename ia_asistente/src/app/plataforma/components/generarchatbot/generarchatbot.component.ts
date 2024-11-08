import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EndpointsService } from '../../service/api/endpoints.service';
import { AssistantCreated, FileVectorStorage, ModelsOpenAI } from '../../interfaces/openAI.interface';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl: './generarchatbot.component.html'
})
export class GenerarChatbotComponent implements OnInit, AfterViewInit {

    @ViewChild('formReg', { static: true }) form: NgForm;

    lasistentes: any[] = [];

    selectedProducts: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    public registro: any = {};

    constructor(public endpoint: EndpointsService) { }

    
    ngOnInit() {
        this.endpoint.dcentral.desencriptarDataUser();
    }

    ngAfterViewInit(): void {
        this.buscarAsistentePorIdUsuario();
    }

    generarInstalable(asistente) {
        this.endpoint.downloadFile(`/chatbot/openai/generar-instalador/${asistente.idasistente}`).subscribe(resp => {
        });
    }

    generarInstalableWordpress(asistente) {
        this.endpoint.downloadFile(`/chatbot/openai/generar-instalador-wordpress/${asistente.idasistente}`).subscribe(resp => {
        });
    }

    buscarAsistentePorIdUsuario() {
        
        const idusuario = this.endpoint.dcentral.user.idusuario;
        this.endpoint.getGenerico<any>(`/asistente/buscar-asistentes/${idusuario}`).subscribe(resp => {
            this.lasistentes = resp.lista
        });
    }
}
