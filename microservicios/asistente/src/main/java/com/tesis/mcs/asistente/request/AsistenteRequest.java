package com.tesis.mcs.asistente.request;

import com.tesis.mcs.asistente.model.Asistente;
import com.tesis.mcs.lib.utils.RequestComun;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
public class AsistenteRequest extends RequestComun<Asistente> {

    @Comment("Id del usuario")
    private Integer id;

    @NotNull
    @Comment("Id de usuario que pertenece")
    private Integer idusuario;

    @NotNull
    @Comment("Nombre")
    private String name;

    @Comment("Descripcion del asistente")
    private String description;

    @NotNull
    @Comment("Modelo GPT que usa el asistente")
    private String model;

    @NotNull
    @Comment("Instrucciones del asistente y que debe hacer")
    private String instructions;

    @Comment("Id del vector storage")
    private String vectorstoreid;

    @Comment("Id de los asistentes")
    private String idasistente;

    @Comment("Para borrado logico")
    private Boolean activo;
    
}
