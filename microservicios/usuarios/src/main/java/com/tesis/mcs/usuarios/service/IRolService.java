package com.tesis.mcs.usuarios.service;

import com.tesis.mcs.usuarios.model.Rol;

import java.util.List;

public interface IRolService {

    List<Rol> listarRolesActivos();

    List<Rol> listarRolesInactivos();

    List<Rol> listarTodosRoles();

    public Rol insertarRol(Rol data);

    public Rol actualizarRol(Rol data);

    public Rol buscarPorId(int id);

}
