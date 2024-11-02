package com.tesis.mcs.usuarios.controller;

import com.tesis.mcs.lib.emuns.EnumEstadoSession;
import com.tesis.mcs.lib.response.BaseResponse;
import com.tesis.mcs.lib.utils.RespuestaComun;
import com.tesis.mcs.lib.utils.TesisNotFoundException;
import com.tesis.mcs.usuarios.jwt.JwtServiceImpl;
import com.tesis.mcs.usuarios.model.Cambiocontrasenia;
import com.tesis.mcs.usuarios.model.Usuariodetalle;
import com.tesis.mcs.usuarios.model.Usuariosession;
import com.tesis.mcs.usuarios.request.CambioContraseniaRequest;
import com.tesis.mcs.usuarios.request.LoginRequest;
import com.tesis.mcs.usuarios.request.RegistroRequest;
import com.tesis.mcs.usuarios.response.LoginResponse;
import com.tesis.mcs.usuarios.service.ICambioContraseniaService;
import com.tesis.mcs.usuarios.service.IRolService;
import com.tesis.mcs.usuarios.service.IUsuarioDetalleService;
import com.tesis.mcs.usuarios.service.imp.EnvioEmail;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/autenticacion")
public class AutenticacionController {

    @Autowired
    private IRolService serviceRol;

    @Autowired
    private IUsuarioDetalleService serviceUsuarioDetalle;

    @Autowired
    private ICambioContraseniaService serviceCambioContrasenia;

    @Autowired
    private EnvioEmail serviceEmail;

    @Autowired
    private JwtServiceImpl serviceJwt;

    private final DiscoveryClient discoveryClient;

    public AutenticacionController(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @GetMapping("/services")
    public List<String> getServices() {
        return discoveryClient.getServices();
    }

    @PostMapping("/login")
    public ResponseEntity<RespuestaComun> validarLogin(HttpServletRequest request, @RequestBody LoginRequest login) throws Exception {
        var entity = serviceUsuarioDetalle.buscarPorEmail(login.getEmail());
        LoginResponse resp = new LoginResponse();
        if (entity == null) {
            throw new TesisNotFoundException("El usuario {0} no existe", login.getEmail());
        } else {
            if (!entity.getPassword().equals(login.getPassword())) {
                throw new TesisNotFoundException("Credenciales del usuario no existe");
            }
            if (!entity.getEstado()) {
                throw new TesisNotFoundException("El usuario esta deshabilitado");
            }
//            if (entity.getUsuariosession() != null && (entity.getUsuariosession().getActivo() || entity.getUsuariosession().getEstado().equals(EnumEstadoSession.INGRESADO.getCodigo())) ) {
//                throw new TesisNotFoundException("El usuario ya tiene una sesion activa desde {0}",entity.getUsuariosession().getFechainicio().toLocaleString());
//            }

            if (entity.getUsuariosession() == null) {
                Usuariosession sesion = new Usuariosession();
                sesion.setEstado(EnumEstadoSession.INGRESADO.getCodigo());
                sesion.setFechainicio(new Date());
                sesion.setActivo(true);
                sesion.setIdsession(login.getSerial());
                sesion.setIptermialremoto("127.1.1.1");
                sesion.setUseragent("Movil");
                sesion.setNumerointentos(1);
                sesion.setUsuariodetalle(entity);
//                servicioSesion.insertarUsuarioSesion(sesion);
            } else {
                entity.getUsuariosession().setNumerointentos(0);
                entity.getUsuariosession().setUseragent("Movil");
                entity.getUsuariosession().setIptermialremoto("127.1.1.1");
//                servicioSesion.actualizarUsuarioSesion(entity.getUsuariosession());
            }

//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(entity.getIdpersona().getEmail(), entity.getPassword()));

            LoginResponse.DataUserDto dto = new LoginResponse.DataUserDto();
            dto.setIdusuario(entity.getId());
            dto.setUsername(entity.getUsername());
            dto.setEmail(entity.getEmail());
            dto.setIdrol(entity.getIdrol().getId());
            dto.setNrol(entity.getIdrol().getNombre());

            resp.setDto(dto);
            resp.setCodigo("OK");
            resp.setMensaje("LOGIN APROBADO");
        }
        Map<String, Object> mdatos = new HashMap<>();
        mdatos.put("idusuario",resp.getDto().getIdusuario());
        mdatos.put("username",resp.getDto().getUsername());
        mdatos.put("email",resp.getDto().getEmail());
        mdatos.put("idrol",resp.getDto().getIdrol());
        mdatos.put("nrol",resp.getDto().getNrol());
        return new ResponseEntity<>(resp, serviceJwt.generaToken(mdatos, entity), HttpStatus.OK);
    }

    @PostMapping("/registrarse")
    public ResponseEntity<RespuestaComun> validarRegistro(HttpServletRequest request, @RequestBody RegistroRequest registro) throws Exception {
        Usuariodetalle usuariodetalle = new Usuariodetalle();
        usuariodetalle.setApellidos(registro.getApellidos());
        usuariodetalle.setNombres(registro.getNombres());
        usuariodetalle.setEmail(registro.getEmail());
        usuariodetalle.setEstado(true);
        usuariodetalle.setCelular(registro.getCelular());
        usuariodetalle.setCambiopassword(false);
        usuariodetalle.setUsername(registro.getUsername());
        usuariodetalle.setPassword(registro.getPassword());
        var rol = serviceRol.buscarPorId(2);
        rol.setUsuariodetalles(null);
        usuariodetalle.setIdrol(rol); // Registra solo para usuarios con rol 2 USUARIOS

        var entity = serviceUsuarioDetalle.insertarUsuarioDetalle(usuariodetalle);
        BaseResponse resp = new BaseResponse();
        if (entity == null) {
            throw new TesisNotFoundException("El usuario no se pudo registrar");
        } else {
            resp.setCodigo("OK");
            resp.setMensaje("REGISTRO EXITOSO");
        }
        Map<String, Object> mdatos = new HashMap<>();
        try {
            mdatos.put("idusuario",entity.getId());
            mdatos.put("username",entity.getUsername());
            mdatos.put("email",entity.getEmail());
            mdatos.put("idrol",entity.getIdrol());
            mdatos.put("nrol",entity.getIdrol().getNombre());
            var token = serviceJwt.generateTokenNuevoUser(mdatos, entity);
            serviceEmail.sendEmailRegistroNuevoUsuario(entity.getEmail(), token, entity.getNombres() + " " + entity.getApellidos());
        } catch (Exception e) {
            throw new TesisNotFoundException("Error: {0}", e.getMessage());
        }
        return new ResponseEntity<>(resp, serviceJwt.regeneraToken(), HttpStatus.OK);
    }

    @PostMapping("/cuentaverificada")
    public ResponseEntity<RespuestaComun> cuentaVerificado() throws Exception {

        var data = serviceJwt.extraerTokenData();
        String email = (String) data.get("email");
        var entity = serviceUsuarioDetalle.buscarPorEmail(email);

        LoginResponse resp = new LoginResponse();

        LoginResponse.DataUserDto dto = new LoginResponse.DataUserDto();
        dto.setIdusuario(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setEmail(entity.getEmail());
        dto.setIdrol(entity.getIdrol().getId());
        dto.setNrol(entity.getIdrol().getNombre());

        resp.setDto(dto);
        resp.setCodigo("OK");
        resp.setMensaje("CUENTA VERIFICADA");

        return new ResponseEntity<>(resp, serviceJwt.regeneraToken(), HttpStatus.OK);
    }

    @PostMapping("/recuperarcontrasenia/{email}")
    public ResponseEntity<RespuestaComun> buscarPorEmail(@PathVariable String email) throws Exception {
        var entity = serviceUsuarioDetalle.buscarPorEmail(email);

        if (entity == null) {
            throw new TesisNotFoundException("El email {0} no existe", email);
        }
        try {
            Map<String, Object> mdatos = new HashMap<>();
            mdatos.put("idusuario",entity.getId());
            mdatos.put("username",entity.getUsername());
            mdatos.put("email",entity.getEmail());
            mdatos.put("idrol",entity.getIdrol().getId());
            mdatos.put("nrol",entity.getIdrol().getNombre());

            var password = serviceUsuarioDetalle.generarRandomPassword(10);
            var passwordencrypt = serviceUsuarioDetalle.encriptarPassword(password);

            var cambiocontrasenia = serviceCambioContrasenia.buscarPorIdUsuario(entity.getId());
            var esTempNuevo = false;
            if (cambiocontrasenia == null) {
                cambiocontrasenia = new Cambiocontrasenia();
                esTempNuevo = true;
            }
            cambiocontrasenia.setUsuariodetalle(entity);
            cambiocontrasenia.setFechagenera(new Date());
            cambiocontrasenia.setPasswordgenerico(passwordencrypt);

            var token = serviceJwt.generateTokenCambioUsuario(mdatos, entity);
            serviceEmail.sendEmailOlvidoContrasenia(entity.getEmail(), token, password, entity.getNombres() + " " + entity.getApellidos());
            if (esTempNuevo) {
                serviceCambioContrasenia.insertarCambioContrasenia(cambiocontrasenia);
            } else {
                serviceCambioContrasenia.actualizarCambioContrasenia(cambiocontrasenia);
            }
        } catch (Exception e) {
            throw new TesisNotFoundException("Error: {0}", e.getMessage());
        }
        BaseResponse resp = new BaseResponse();
        resp.setCodigo("OK");

        return new ResponseEntity<>(resp, serviceJwt.regeneraToken(), HttpStatus.OK);
    }

    @PostMapping("/confirmarPassword")
    public ResponseEntity<RespuestaComun> confirmarPassword(HttpServletRequest request, @RequestBody CambioContraseniaRequest registro) throws Exception {
        var data = serviceJwt.extraerTokenData();
        String email = (String) data.get("email");
        var entity = serviceUsuarioDetalle.buscarPorEmail(email);

        if (entity == null) {
            throw new TesisNotFoundException("El email {0} no existe", email);
        }

        var contra = serviceCambioContrasenia.buscarPorCredenciales(entity.getId(), registro.getPasswordtemp());
        if (contra == null) {
            throw new TesisNotFoundException("No existe proceso cambio de contrasenia");
        }

        Map<String, Object> mdatos = new HashMap<>();
        try {
            mdatos.put("idusuario",entity.getId());
            mdatos.put("username",entity.getUsername());
            mdatos.put("email",entity.getEmail());
            mdatos.put("idrol",entity.getIdrol().getId());
            mdatos.put("nrol",entity.getIdrol().getNombre());

            entity.setPassword(registro.getNuevopassword());
            serviceUsuarioDetalle.actualizarUsuarioDetalle(entity);
        } catch (Exception e) {
            throw new TesisNotFoundException("Error: {0}", e.getMessage());
        }
        LoginResponse resp = new LoginResponse();

        LoginResponse.DataUserDto dto = new LoginResponse.DataUserDto();
        dto.setIdusuario(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setEmail(entity.getEmail());
        dto.setIdrol(entity.getIdrol().getId());
        dto.setNrol(entity.getIdrol().getNombre());

        resp.setDto(dto);
        resp.setCodigo("OK");
        resp.setMensaje("CONTRASEÑA ACTUALIZADA");

        return new ResponseEntity<>(resp, serviceJwt.generaToken(mdatos, entity), HttpStatus.OK);
    }

}
