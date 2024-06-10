package com.tesis.mcs.usuarios.service.imp;

import com.tesis.mcs.usuarios.model.Rol;
import com.tesis.mcs.usuarios.repository.IRolRepository;
import com.tesis.mcs.usuarios.service.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class RolServiceImp implements IRolService {

    @Autowired
    private IRolRepository repo;

    @Override
    public List<Rol> listarRolesActivos() {
        return repo.buscarPorEstado(true);
    }

    @Override
    public List<Rol> listarRolesInactivos() {
        return repo.buscarPorEstado(false);
    }

    @Override
    public List<Rol> listarTodosRoles() {
        return repo.findAll();
    }

    @Override
    public Rol insertarRol(Rol data) {
        return repo.save(data);
    }

    @Override
    public Rol actualizarRol(Rol data) {
        Rol existeRol = repo.findById(data.getId()).orElse(null);
        existeRol.setNombre(data.getNombre());
        existeRol.setActivo(data.getActivo());
        return repo.save(existeRol);
    }

    @Override
    public Rol buscarPorId(int id) {
        return repo.findById(id).orElse(null);
    }
}
