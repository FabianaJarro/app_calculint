
package br.edu.ifsp.calculint.controller;

import br.edu.ifsp.calculint.dto.NivelRequestDTO;
import br.edu.ifsp.calculint.dto.UserResponseDTO;
import br.edu.ifsp.calculint.dto.UserProfileRequestDTO;
import br.edu.ifsp.calculint.dto.UserProfileResponseDTO;
import br.edu.ifsp.calculint.model.User;
import br.edu.ifsp.calculint.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponseDTO> getMeuPerfil(Authentication authentication) {
        User user = usuarioAutenticado(authentication);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(perfilResponse(user));
    }

    @PutMapping("/me")
    public ResponseEntity<?> atualizarMeuPerfil(
            @RequestBody UserProfileRequestDTO body,
            Authentication authentication
    ) {
        User user = usuarioAutenticado(authentication);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        if (body == null || body.name() == null || body.name().isBlank() || body.name().length() > 120) {
            return ResponseEntity.badRequest().body("Informe um nome com até 120 caracteres.");
        }
        if (body.idade() != null && (body.idade() < 3 || body.idade() > 120)) {
            return ResponseEntity.badRequest().body("A idade deve estar entre 3 e 120 anos.");
        }
        if (body.escolaridade() != null && body.escolaridade().length() > 80) {
            return ResponseEntity.badRequest().body("A escolaridade deve ter até 80 caracteres.");
        }

        user.setName(body.name().trim());
        user.setIdade(body.idade());
        user.setEscolaridade(body.escolaridade() == null || body.escolaridade().isBlank()
                ? null
                : body.escolaridade().trim());

        return ResponseEntity.ok(perfilResponse(userRepository.save(user)));
    }

    private User usuarioAutenticado(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            return null;
        }
        return user;
    }

    private UserProfileResponseDTO perfilResponse(User user) {
        return new UserProfileResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getNivelAtual(),
                user.getIdade(),
                user.getEscolaridade()
        );
    }

    @GetMapping
    public List<UserResponseDTO> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                ))
                .toList();
    }


    @PutMapping("/nivel")
    public ResponseEntity<?> atualizarNivel(
            @RequestBody NivelRequestDTO body,
            Authentication authentication
    ) {
        if (body == null || body.nivelAtual() == null) {
            return ResponseEntity.badRequest().build();
        }

        if (authentication == null ||
                !(authentication.getPrincipal() instanceof User user)) {
            return ResponseEntity.status(401).build();
        }

        user.setNivelAtual(body.nivelAtual());

        User usuarioSalvo = userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("nivelAtual", usuarioSalvo.getNivelAtual())
        );
    }

}
