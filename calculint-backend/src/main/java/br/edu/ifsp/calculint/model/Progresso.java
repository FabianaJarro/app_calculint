
package br.edu.ifsp.calculint.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(
        name = "progresso_atividades",
        uniqueConstraints = @UniqueConstraint(
                columnNames = {
                        "usuario_id", "nivel", "operacao", "modulo"
                }
        )
)
public class Progresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Nivel nivel;

    @Column(nullable = false)
    private String operacao;

    @Column(nullable = false)
    private String modulo;

    private int acertos;

    private int totalQuestoes;
}
