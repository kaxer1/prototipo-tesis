import { Component, Input } from '@angular/core';
import { CrudEntidad } from './crud.interface';
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
    }

    eliminarRegistro(reg: any) {
        this.confirmationService.confirm({
          message: 'Está seguro que desea eliminar?',
          header: 'Confirmación',
          accept: () => {
            this.entidadCrud.eliminar(reg);
          }
        });
      }
    
}
