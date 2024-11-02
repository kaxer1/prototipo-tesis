package com.tesis.mcs.asistente.request;

import com.tesis.mcs.asistente.model.Archivosusuario;
import com.tesis.mcs.lib.utils.RequestComun;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
public class ArchivoUsuarioRequest extends RequestComun<Archivosusuario> {

    @Comment("Id de usuario que pertenece")
    private Integer idusuario;

    @Comment("Id de identificacion del archivo en openai")
    private String idvector;

    @Comment("Id del vectonr storage")
    private String vectorstoreid;

    @Comment("nombres del vector")
    private String nombrevector;
}
