package com.tesis.mcs.asistente.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.type.NumericBooleanConverter;

import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "asistente")
public class Asistente implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(name = "idusuario", nullable = false)
    private Integer idusuario;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "model", nullable = false)
    private String model;

    @NotNull
    @Column(name = "instructions", nullable = false)
    private String instructions;

    @NotNull
    @Column(name = "vectorstoreid", nullable = false)
    private String vectorstoreid;

    @NotNull
    @Column(name = "idasistente", nullable = false)
    private String idasistente;

    @Column(name = "activo", precision = 1)
    @Convert(converter = NumericBooleanConverter.class)
    private Boolean activo;

}
