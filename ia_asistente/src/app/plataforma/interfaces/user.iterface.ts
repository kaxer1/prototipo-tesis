import { Menu } from "./menu.model";
import { CommunResponse } from "./comun.interface";

export interface User {
    idusuario: number;
    username:  string;
    email:     string;
    idrol:     number;
    nrol:      string;
}

export interface LoginResp extends CommunResponse<User> {}



// export interface User {
//     id?: number,
//     username: string,
//     fullname: string,
//     nombre: string,
//     apellido: string,
//     cedula: string,
//     email: string,
//     rol: number,
//     iniciales: string,
//     sufrago?: boolean,
//     activo?: boolean | null,
//     estudiante?: boolean | null,
//     password?: string,
//     vota?: boolean
//     tiemposesion?: number,
//     nrol?: string
// }

export const userDefault: User = {
    idusuario: 0,
    username:  "",
    email:     "",
    idrol:     0,
    nrol:      "",
}


export interface permisosSistema {
    crear: boolean,
    editar: boolean,
    elminar: boolean
}