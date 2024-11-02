import { CommunResponse } from "./comun.interface";

export interface UsuarioDetalle {
    id:             number;
    email:          string;
    username:       string;
    celular:        string;
    nombres:        string;
    apellidos:      string;
    estado:         boolean;
    password:       string | null;
    cambiopassword: boolean;
    observacion:    string | null;
}

export interface UsuarioDetalleResp extends CommunResponse<UsuarioDetalle> {}