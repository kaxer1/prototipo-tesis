export interface CommunResponse<T> {
    mensaje: string | null;
    codigo:  string | null;
    dto:     T;
    lista:   T[];
}

export interface Params {
    msgExito?: string;
    mostrarMsg?: boolean;
}