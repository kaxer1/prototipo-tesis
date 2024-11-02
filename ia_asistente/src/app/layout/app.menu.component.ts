import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            // {
            //     label: 'Home',
            //     items: [
            //         { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
            //     ]
            // },
            {
                label: 'Asistente',
                items: [
                    { label: 'Crear Asistente', icon: 'pi pi-fw pi-user', routerLink: ['/asistente'] },
                    { label: 'Generar Instalador', icon: 'pi pi-fw pi-file-export', routerLink: ['/generar-chatbot'] },
                    
                ]
            },
        ];
    }
}
