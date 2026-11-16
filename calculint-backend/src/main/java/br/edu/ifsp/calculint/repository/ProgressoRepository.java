
package br.edu.ifsp.calculint.repository;

import br.edu.ifsp.calculint.model.Nivel;
import br.edu.ifsp.calculint.model.Progresso;
import br.edu.ifsp.calculint.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProgressoRepository
        extends JpaRepository<Progresso, Long> {

    List<Progresso> findByUsuario(User usuario);

    Optional<Progresso>
    findByUsuarioAndNivelAndOperacaoAndModulo(
            User usuario,
            Nivel nivel,
            String operacao,
            String modulo
    );
}
