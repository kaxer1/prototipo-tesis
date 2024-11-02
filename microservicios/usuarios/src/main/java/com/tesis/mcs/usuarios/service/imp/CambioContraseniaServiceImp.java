package com.tesis.mcs.usuarios.service.imp;

import com.tesis.mcs.usuarios.model.Cambiocontrasenia;
import com.tesis.mcs.usuarios.repository.ICambioContraseniaRepository;
import com.tesis.mcs.usuarios.service.ICambioContraseniaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Service
@Component
public class CambioContraseniaServiceImp implements ICambioContraseniaService {

    @Autowired
    private ICambioContraseniaRepository repo;

    @Override
    public Cambiocontrasenia insertarCambioContrasenia(Cambiocontrasenia data) {
        return repo.save(data);
    }

    @Override
    public Cambiocontrasenia actualizarCambioContrasenia(Cambiocontrasenia data) {
        Cambiocontrasenia existe = repo.findById(data.getId()).orElse(null);
        existe.setPasswordgenerico(data.getPasswordgenerico());
        existe.setUsuariodetalle(data.getUsuariodetalle());
        existe.setFechagenera(data.getFechagenera());
        return repo.save(existe);
    }

    @Override
    public Cambiocontrasenia buscarPorCredenciales(int idusuario, String password) {
        return repo.buscarPorCredenciales(idusuario, password);
    }

    @Override
    public Cambiocontrasenia buscarPorIdUsuario(int idusuario) {
        return repo.buscarPorIdUsuario(idusuario);
    }
}
