package com.tesis.mcs.asistente.repository;

import com.tesis.mcs.asistente.model.Archivosusuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IArchivoUsuarioRepository extends JpaRepository<Archivosusuario, Integer> {


    @Query("Select t from Archivosusuario t where t.idusuario= ?1")
    Optional<Archivosusuario> buscarPorIdUsuario(int idusuario);

}

