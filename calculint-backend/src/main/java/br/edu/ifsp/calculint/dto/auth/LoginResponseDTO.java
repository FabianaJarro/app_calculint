package br.edu.ifsp.calculint.dto.auth;
import br.edu.ifsp.calculint.model.Nivel;


public record LoginResponseDTO (String name, String token, Nivel nivelAtual){
}
