package br.edu.ifsp.calculint.dto;

import br.edu.ifsp.calculint.model.Nivel;

public record UserProfileResponseDTO(
        String id,
        String name,
        String email,
        Nivel nivelAtual,
        Integer idade,
        String escolaridade
) {
}
