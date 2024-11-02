package com.tesis.mcs.usuarios.request;

import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
public class CambioContraseniaRequest {
    @Comment("Contrasenia temporal generada por el servicio")
    private String passwordtemp;

    @Comment("Nueva contrasenia")
    private String nuevopassword;

}
