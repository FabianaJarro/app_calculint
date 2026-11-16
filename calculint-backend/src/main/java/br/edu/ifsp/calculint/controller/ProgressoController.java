
package br.edu.ifsp.calculint.controller;

import br.edu.ifsp.calculint.model.*;
import br.edu.ifsp.calculint.repository.ProgressoRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/progresso")
public class ProgressoController {

    private final ProgressoRepository repository;

    public ProgressoController(ProgressoRepository repository) {
        this.repository = repository;
    }

    public record ProgressoRequest(
            Nivel nivel,
            String operacao,
            String modulo,
            int acertos,
            int totalQuestoes
    ) {}

    public record ProgressoResponse(
            Nivel nivel,
            String operacao,
            String modulo,
            int acertos,
            int totalQuestoes
    ) {}

    @GetMapping
    public List<ProgressoResponse> listar(
            @AuthenticationPrincipal User usuario
    ) {
        if (usuario == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED
            );
        }

        return repository.findByUsuario(usuario)
                .stream()
                .map(this::converter)
                .toList();
    }

    @PutMapping
    public ProgressoResponse salvar(
            @AuthenticationPrincipal User usuario,
            @RequestBody ProgressoRequest dados
    ) {
        if (usuario == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED
            );
        }

        if (dados.nivel() == null ||
                dados.operacao() == null ||
                dados.operacao().isBlank() ||
                dados.totalQuestoes() <= 0 ||
                dados.acertos() < 0 ||
                dados.acertos() > dados.totalQuestoes()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Dados de progresso inválidos"
            );
        }

        String operacao = dados.operacao()
                .trim()
                .toLowerCase(Locale.ROOT);

        String modulo = dados.modulo() == null ||
                dados.modulo().isBlank()
                ? "objetos"
                : dados.modulo().trim().toLowerCase(Locale.ROOT);

        Progresso progresso = repository
                .findByUsuarioAndNivelAndOperacaoAndModulo(
                        usuario,
                        dados.nivel(),
                        operacao,
                        modulo
                )
                .orElseGet(() -> {
                    Progresso novo = new Progresso();
                    novo.setUsuario(usuario);
                    novo.setNivel(dados.nivel());
                    novo.setOperacao(operacao);
                    novo.setModulo(modulo);
                    return novo;
                });

        // Conserva a melhor pontuação em tentativas repetidas
        progresso.setAcertos(
                Math.max(progresso.getAcertos(), dados.acertos())
        );

        progresso.setTotalQuestoes(dados.totalQuestoes());

        return converter(repository.save(progresso));
    }

    private ProgressoResponse converter(Progresso p) {
        return new ProgressoResponse(
                p.getNivel(),
                p.getOperacao(),
                p.getModulo(),
                p.getAcertos(),
                p.getTotalQuestoes()
        );
    }
}
