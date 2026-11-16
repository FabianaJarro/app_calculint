
package br.edu.ifsp.calculint.dto;

import java.util.List;

public record ExercicioGeradoDTO(
        String enunciado,
        int numero1,
        int numero2,
        String simbolo,
        String objeto,
        List<Integer> alternativas,
        int respostaCorreta
) {}
