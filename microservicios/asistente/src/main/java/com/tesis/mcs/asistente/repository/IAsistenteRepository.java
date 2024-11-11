package com.tesis.mcs.asistente.repository;

import com.tesis.mcs.asistente.model.Asistente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IAsistenteRepository extends JpaRepository<Asistente, Integer> {


    @Query("Select t from Asistente t where t.idusuario= ?1 and t.activo = true")
    List<Asistente> buscarPorIdUsuario(int idusuario);

}

