package br.edu.ifsp.calculint.controller;

import br.edu.ifsp.calculint.model.User;
import br.edu.ifsp.calculint.repository.ProgressoRepository;
import br.edu.ifsp.calculint.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/progresso")
@RestController
public class ProgressoController {
    @GetMapping("/progresso")
    public Progresso buscarProgresso(Authentication authentication) {

        String email = authentication.getName();

        User user = UserRepository.findByEmail(email)
                .orElseThrow();

        return ProgressoRepository.findByUsuario(user)
                .orElseThrow();
    }
}
