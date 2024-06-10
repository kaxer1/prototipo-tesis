package com.tesis.mcs.usuarios.response;

import com.tesis.mcs.lib.utils.RespuestaComun;
import lombok.Data;
import org.hibernate.annotations.Comment;

import java.util.Date;

@Data
public class UsuarioDetalleResponse extends RespuestaComun<UsuarioDetalleResponse.UsuarioDetalleDto> {

    @Data
    public static class UsuarioDetalleDto {

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

//		private Usuariosession usuariosession;

    }
}
