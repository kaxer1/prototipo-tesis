package com.tesis.mcs.usuarios.service;

import com.tesis.mcs.usuarios.model.Cambiocontrasenia;

public interface ICambioContraseniaService {

    public Cambiocontrasenia insertarCambioContrasenia(Cambiocontrasenia data);

    public Cambiocontrasenia actualizarCambioContrasenia(Cambiocontrasenia data);

    public Cambiocontrasenia buscarPorCredenciales(int idusuario, String password);

    public Cambiocontrasenia buscarPorIdUsuario(int idusuario);

}
