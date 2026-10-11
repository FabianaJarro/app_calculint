package br.edu.ifsp.calculint.controller;

import br.edu.ifsp.calculint.dto.UserResponseDTO;
import br.edu.ifsp.calculint.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ifsp.calculint.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/user")

public class UserController{
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
        public List<UserResponseDTO> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(user-> new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                ))
                .toList();
    }
}