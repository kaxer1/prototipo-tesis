package com.tesis.mcs.usuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.type.NumericBooleanConverter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "usuariodetalle")
public class Usuariodetalle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "idusuario", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.RESTRICT)
    @JoinColumn(name = "idrol")
    private Rol idrol;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "celular", nullable = false, length = 10)
    private String celular;

    @Column(name = "nombres", length = 100)
    private String nombres;

    @Column(name = "apellidos", length = 100)
    private String apellidos;

    @Column(name = "estado", precision = 1)
    @Convert(converter = NumericBooleanConverter.class)
    private Boolean estado;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "cambiopassword", precision = 1)
    @Convert(converter = NumericBooleanConverter.class)
    private Boolean cambiopassword;

    @Column(name = "observacion", length = 100)
    private String observacion;

    @OneToOne(mappedBy = "usuariodetalle")
    private Cambiocontrasenia cambiocontrasenia;

    @OneToOne(mappedBy = "usuariodetalle")
    private Usuariosession usuariosession;

}
