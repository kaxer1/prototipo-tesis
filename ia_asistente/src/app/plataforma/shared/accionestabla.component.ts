import { Component, Input } from '@angular/core';
import { CrudEntidad } from './crud.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'acciones-tabla',
    templateUrl: './accionestabla.component.html'
})
export class AccionesTablaComponent{

    @Input()
    mostrarEditar = true;

    @Input()
    mostrarEliminar = true;
    
    @Input() reg: any;
    @Input() entidadCrud: CrudEntidad<any>;

    constructor(private confirmationService: ConfirmationService) { 
        console.log(this.reg);
        console.log(this.entidadCrud);
    }

    eliminarRegistro(reg: any) {
        this.confirmationService.confirm({
          message: 'Está seguro que desea eliminar?',
          header: 'Confirmación',
          accept: () => {
            this.entidadCrud.seleccionarRegistro(reg);
            this.entidadCrud.eliminar();
          }
        });
      }
    
}
