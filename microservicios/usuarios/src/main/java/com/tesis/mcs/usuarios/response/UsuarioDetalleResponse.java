package com.tesis.mcs.usuarios.response;

import com.tesis.mcs.lib.utils.RespuestaComun;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
public class UsuarioDetalleResponse extends RespuestaComun<UsuarioDetalleResponse.UsuarioDetalleDto> {

    @Data
    public static class UsuarioDetalleDto {

        @Comment("Codigo de usuario")
        private Integer id;

        @Comment("Codigo de rol")
        private Integer idrol;

        @Comment("Correo electronico")
        private String email;

        @Comment("Username")
        private String username;

        @Comment("Celular")
        private String celular;

        @Comment("Nombre de la persona")
        private String nombres;

        @Comment("Apellido de la persona")
        private String apellidos;

        @Comment("Estado del usuario")
        private Boolean estado;

        @Comment("Contrasenia")
        private String password;

        @Comment("Cambio de contrasenia")
        private Boolean cambiopassword;

        @Comment("Observacion")
        private String observacion;

    }
}
