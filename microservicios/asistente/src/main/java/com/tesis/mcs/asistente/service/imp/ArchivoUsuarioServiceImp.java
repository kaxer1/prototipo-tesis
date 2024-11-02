package com.tesis.mcs.asistente.service.imp;

import com.tesis.mcs.asistente.model.Archivosusuario;
import com.tesis.mcs.asistente.repository.IArchivoUsuarioRepository;
import com.tesis.mcs.asistente.service.IArchivoUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Service
@Component
public class ArchivoUsuarioServiceImp implements IArchivoUsuarioService {

    @Autowired
    private IArchivoUsuarioRepository repo;


    @Override
    public Archivosusuario insertarArchivoUsuario(Archivosusuario data) {
        return repo.save(data);
    }

    @Override
    public Archivosusuario actualizarArchivoUsuario(Archivosusuario data) {
        Archivosusuario existeArch = repo.findById(data.getId()).orElse(null);
        existeArch.setIdusuario(data.getIdusuario());
        existeArch.setIdvector(data.getIdvector());
        existeArch.setNombrevector(data.getNombrevector());
        existeArch.setVectorstoreid(data.getVectorstoreid());
        return repo.save(existeArch);
    }

    @Override
    public Archivosusuario buscarPorId(int id) {
        return repo.findById(id).orElse(null);
    }
}
