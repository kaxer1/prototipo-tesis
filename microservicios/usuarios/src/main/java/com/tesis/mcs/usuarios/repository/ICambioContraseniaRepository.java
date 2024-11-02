package com.tesis.mcs.usuarios.repository;

import com.tesis.mcs.usuarios.model.Cambiocontrasenia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICambioContraseniaRepository extends JpaRepository<Cambiocontrasenia, Integer> {

    @Query("Select t from Cambiocontrasenia t where t.id = ?1 and t.passwordgenerico = ?2")
    Cambiocontrasenia buscarPorCredenciales(int id, String password);

    @Query("Select t from Cambiocontrasenia t where t.id = ?1")
    Cambiocontrasenia buscarPorIdUsuario(int id);

}
