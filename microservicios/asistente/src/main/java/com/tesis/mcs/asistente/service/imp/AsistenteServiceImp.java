package com.tesis.mcs.asistente.service.imp;

import com.tesis.mcs.asistente.model.Archivosusuario;
import com.tesis.mcs.asistente.model.Asistente;
import com.tesis.mcs.asistente.repository.IAsistenteRepository;
import com.tesis.mcs.asistente.service.IAsistenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Component
public class AsistenteServiceImp implements IAsistenteService {

    @Autowired
    private IAsistenteRepository repo;


    @Override
    public Asistente insertarAsistente(Asistente data) {
        return repo.save(data);
    }

    @Override
    public Asistente actualizarAsistente(Asistente data) {
        Asistente asistente = repo.findById(data.getId()).orElse(null);
        asistente.setIdusuario(data.getIdusuario());
        asistente.setVectorstoreid(data.getVectorstoreid());
        asistente.setDescription(data.getDescription());
        asistente.setName(data.getName());
        asistente.setModel(data.getModel());
        asistente.setInstructions(data.getInstructions());
        asistente.setActivo(data.getActivo());
        asistente.setIdasistente(data.getIdasistente());
        return repo.save(asistente);
    }

    @Override
    public Asistente buscarPorId(int id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Asistente> buscarPorIdUsuario(int idusuario) {
        return repo.buscarPorIdUsuario(idusuario);
    }
}
