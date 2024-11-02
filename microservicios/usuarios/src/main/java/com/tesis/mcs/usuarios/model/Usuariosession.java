package com.tesis.mcs.usuarios.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.type.NumericBooleanConverter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "usuariosession")
public class Usuariosession implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "idusuario", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(optional = false)
    @JoinColumn(name = "idusuario", nullable = false)
    private Usuariodetalle usuariodetalle;

    @Column(name = "numerointentos", precision = 2)
    private int numerointentos;

    @Column(name = "idsession", length = 70)
    private String idsession;

    @Column(name = "fechainicio")
    @Temporal(TemporalType.DATE)
    private Date fechainicio;

    @Column(name = "fechasalida")
    @Temporal(TemporalType.DATE)
    private Date fechasalida;

    @ColumnDefault("0")
    @Column(name = "activo", precision = 1)
    @Convert(converter = NumericBooleanConverter.class)
    private Boolean activo;

    @Column(name = "estado", length = 1)
    private String estado;

    @Column(name = "useragent", length = 200)
    private String useragent;

    @Column(name = "iptermialremoto", length = 130)
    private String iptermialremoto;

}
