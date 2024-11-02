package com.tesis.mcs.asistente.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "archivosusuario")
public class Archivosusuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "idusuario", nullable = false)
    @NotNull
    private Integer idusuario;

    @Size(max = 100)
    @NotNull
    @Column(name = "idvector", nullable = false, length = 100)
    private String idvector;

    @Size(max = 100)
    @NotNull
    @Column(name = "vectorstoreid", nullable = false, length = 100)
    private String vectorstoreid;

    @Size(max = 255)
    @NotNull
    @Column(name = "nombrevector", nullable = false, length = 255)
    private String nombrevector;

}
