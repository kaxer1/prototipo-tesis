import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EndpointsService } from '../../service/api/endpoints.service';
import { AssistantCreated, FileVectorStorage, ModelsOpenAI } from '../../interfaces/proceso.interface';
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

    mostarGenerar(asistente) {
        this.endpoint.downloadFile(`/chatbot/openai/generar-instalador/${asistente.idasistente}`).subscribe(resp => {
        });
    }

    buscarAsistentePorIdUsuario() {
        
        const idusuario = this.endpoint.dcentral.user.idusuario;
        this.endpoint.getGenerico<any>(`/asistente/buscar-asistentes/${idusuario}`).subscribe(resp => {
            this.lasistentes = resp.lista
        });
    }
}
