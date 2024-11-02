package com.tesis.mcs.usuarios.request;

import com.tesis.mcs.lib.utils.RequestComun;
import com.tesis.mcs.usuarios.model.Usuariodetalle;
import lombok.Data;
import org.hibernate.annotations.Comment;

import java.util.Date;

@Data
public class UsuarioDetalleRequest extends RequestComun<Usuariodetalle> {

    @Comment("Codigo de usuario.")
    private Integer idusuario;

    @Comment("1 catalogo activo, 0 Inactivo")
    private Boolean estado;

    @Comment("Nombre de usuario ")
    private String username;

    @Comment("Password encriptado del usuario.")
    private String password;

    @Comment("1, Indica que el usuario tiene que cambiar de password")
    private Boolean cambiopassword;

    @Comment("Observacion del usuario, ejemplo cuando hay cambio de estado")
    private String observacion;

}
