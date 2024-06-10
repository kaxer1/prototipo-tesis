package com.tesis.mcs.usuarios.request;

import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
public class RegistroRequest {

    @Comment("Correo electronico")
    private String email;

    @Comment("contrasenia encryptada")
    private String password;

    @Comment("Nombre usuario")
    private String username;

    @Comment("Nombre de la persona")
    private String nombres;

    @Comment("Apellidos de la persona")
    private String apellidos;

    @Comment("Celular")
    private String celular;

}
