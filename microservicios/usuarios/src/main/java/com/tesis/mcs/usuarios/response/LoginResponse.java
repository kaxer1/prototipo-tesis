package com.tesis.mcs.usuarios.response;


import com.tesis.mcs.lib.utils.RespuestaComun;
import lombok.Data;
import org.hibernate.annotations.Comment;

@Data
public class LoginResponse extends RespuestaComun<LoginResponse.DataUserDto> {

    @Data
    public static class DataUserDto {
        @Comment("Codigo de usuario")
        private Integer idusuario;

        @Comment("Nombre de usuarios")
        private String username;

        @Comment("Email")
        private String email;

        @Comment("Codigo de rol")
        private Integer idrol;

        @Comment("Nombre del rol")
        private String nrol;

    }

}
