package br.edu.ifsp.calculint.dto;

public record UserProfileRequestDTO(
        String name,
        Integer idade,
        String escolaridade
) {
}
