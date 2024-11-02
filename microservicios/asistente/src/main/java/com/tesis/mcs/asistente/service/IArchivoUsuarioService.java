package com.tesis.mcs.asistente.service;

import com.tesis.mcs.asistente.model.Archivosusuario;


public interface IArchivoUsuarioService {

    public Archivosusuario insertarArchivoUsuario(Archivosusuario data);

    public Archivosusuario actualizarArchivoUsuario(Archivosusuario data);

    public Archivosusuario buscarPorId(int id);

}
