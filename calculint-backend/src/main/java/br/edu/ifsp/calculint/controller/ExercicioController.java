
package br.edu.ifsp.calculint.controller;

import br.edu.ifsp.calculint.dto.ExercicioGeradoDTO;
import br.edu.ifsp.calculint.model.Nivel;
import br.edu.ifsp.calculint.service.ExercicioService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercicios")
public class ExercicioController {

    private final ExercicioService exercicioService;

    public ExercicioController(ExercicioService exercicioService) {
        this.exercicioService = exercicioService;
    }

    @GetMapping
    public List<ExercicioGeradoDTO> gerar(
            @RequestParam Nivel nivel,
            @RequestParam String operacao,
            @RequestParam(defaultValue = "objetos") String modulo
    ) {
        return exercicioService.gerarLista(
                nivel,
                operacao,
                modulo
        );
    }
}
