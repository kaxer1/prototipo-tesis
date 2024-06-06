package com.tesis.mcs.usuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name = "cambiocontrasenia")
public class Cambiocontrasenia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "idusuario", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "idusuario", nullable = false)
    private Usuariodetalle usuariodetalle;

    @Column(name = "passwordgenerico", length = 100)
    private String passwordgenerico;

    @Column(name = "fechagenera")
    private Timestamp fechagenera;

}
