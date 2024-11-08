
export declare interface CrudEntidad<T>{

    consultar();
    guardar();
    
    crearNuevo();
    actualizar();
    eliminar();
    seleccionarRegistro(reg: T);

}