package com.tesis.mcs.asistente.service;

import com.tesis.mcs.asistente.model.Asistente;

import java.util.List;


public interface IAsistenteService {

    public Asistente insertarAsistente(Asistente data);

    public Asistente actualizarAsistente(Asistente data);

    public Asistente buscarPorId(int id);

    public List<Asistente> buscarPorIdUsuario(int idusuario);

}
