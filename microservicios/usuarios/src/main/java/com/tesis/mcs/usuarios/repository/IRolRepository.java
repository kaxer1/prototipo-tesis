package com.tesis.mcs.usuarios.repository;

import com.tesis.mcs.usuarios.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRolRepository extends JpaRepository<Rol, Integer> {

    @Query("Select r from Rol r where r.activo= ?1")
    List<Rol> buscarPorEstado(Boolean estado);

}
