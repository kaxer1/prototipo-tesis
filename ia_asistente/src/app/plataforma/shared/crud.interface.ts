
export declare interface CrudEntidad<T>{

    consultar();
    guardar();
    
    crearNuevo();
    actualizar();
    eliminar(reg: T);
    seleccionarRegistro(reg: T);

}