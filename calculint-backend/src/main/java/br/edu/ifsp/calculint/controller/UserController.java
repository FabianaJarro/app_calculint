
package br.edu.ifsp.calculint.controller;

import br.edu.ifsp.calculint.dto.NivelRequestDTO;
import br.edu.ifsp.calculint.dto.UserResponseDTO;
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
