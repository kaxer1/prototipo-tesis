package com.tesis.mcs.usuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.type.NumericBooleanConverter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "rol")
public class Rol implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "idrol")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre", length = 100)
    private String nombre;

    @ColumnDefault("1")
    @Column(name = "activo", precision = 1)
    @Convert(converter = NumericBooleanConverter.class)
    private Boolean activo;

    @OneToMany(mappedBy = "idrol")
    private List<Usuariodetalle> usuariodetalles = new ArrayList<>();

}
