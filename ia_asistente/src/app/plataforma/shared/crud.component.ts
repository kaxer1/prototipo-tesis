
export abstract class CrudComponente<T>{

    public componente = null;
    public esnuevo: boolean = true;
    public mostrarDialog: boolean = false;
    public lregistros: T[] = [];
    public registro: T;

    constructor() {
    }
    
    crearNuevoReg() {
        this.esnuevo = true;
        this.mostrarDialog = true;
        this.registro = {} as T;
    }
    
    cancelarReg() {
        this.mostrarDialog = false;
        this.registro = {} as T;
    }
    
    seleccionarRegistroReg(reg: T) {
        this.esnuevo = false;
        this.mostrarDialog = true
        this.registro = {...reg};
    }
    
    aceptar() {
        if (this.esnuevo) {
            this.componente.guardar();
        } else {
            this.componente.actualizar();
        }
    }

    procesaRespuestaAcciones(reg: T, pk: string) {
        var index = this.lregistros.findIndex(obj => obj[pk] == reg[pk]);
        this.lregistros[index] = reg;
        this.mostrarDialog = false;
    }

    procesaRespuestaNuevo(reg: T) {
        this.lregistros = [...this.lregistros, reg]
        this.mostrarDialog = false;
    }

}