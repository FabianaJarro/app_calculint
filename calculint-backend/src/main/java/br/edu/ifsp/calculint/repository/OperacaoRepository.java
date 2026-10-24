
package br.edu.ifsp.calculint.repository;

import br.edu.ifsp.calculint.model.Nivel;
import br.edu.ifsp.calculint.model.Operacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OperacaoRepository
        extends JpaRepository<Operacao, Long> {

    List<Operacao> findByNivel(Nivel nivel);
}
