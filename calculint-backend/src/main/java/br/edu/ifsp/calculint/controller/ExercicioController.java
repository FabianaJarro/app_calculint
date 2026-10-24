package br.edu.ifsp.calculint.controller;

import br.edu.ifsp.calculint.service.ExercicioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exercicios")
public class ExercicioController {

    private final ExercicioService exercicioService;

    public ExercicioController(ExercicioService exercicioService) {
        this.exercicioService = exercicioService;
    }

    @GetMapping("/adicao")
    public String gerarAdicao() {
        return exercicioService.gerarAdicao();
    }
}