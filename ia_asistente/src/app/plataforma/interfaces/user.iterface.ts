import { Menu } from "./menu.model";

export interface CommunResponse<T> {
    mensaje: string | null;
    codigo:  string | null;
    dto:     T;
    lista:   T[];
}

export interface LoginDto {
    idusuario: number;
    username:  string;
    email:     string;
    idrol:     number;
    nrol:      string;
}

export interface LoginResp extends CommunResponse<LoginDto> {}



export interface User {
    id?: number,
    username: string,
    fullname: string,
    nombre: string,
    apellido: string,
    cedula: string,
    email: string,
    rol: number,
    iniciales: string,
    sufrago?: boolean,
    activo?: boolean | null,
    estudiante?: boolean | null,
    password?: string,
    vota?: boolean
    tiemposesion?: number,
    nrol?: string
}

export const userDefault: User = {
    username: '',
    fullname: '',
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    rol: undefined,
    iniciales: ''
}

export interface permisosSistema {
    crear: boolean,
    editar: boolean,
    elminar: boolean
}