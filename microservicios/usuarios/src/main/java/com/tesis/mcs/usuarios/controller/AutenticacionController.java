package com.tesis.mcs.usuarios.controller;

import com.tesis.mcs.lib.emuns.EnumEstadoSession;
import com.tesis.mcs.lib.utils.RespuestaComun;
import com.tesis.mcs.lib.utils.TesisNotFoundException;
import com.tesis.mcs.usuarios.jwt.JwtServiceImpl;
import com.tesis.mcs.usuarios.model.Usuariosession;
import com.tesis.mcs.usuarios.request.LoginRequest;
import com.tesis.mcs.usuarios.response.LoginResponse;
import com.tesis.mcs.usuarios.service.IUsuarioDetalleService;
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
    private IUsuarioDetalleService serviceUsuarioDetalle;

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

}
