package br.edu.ifsp.calculint.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_atual", nullable = true)
    private Nivel nivelAtual;

    public Nivel getNivelAtual() {
        return nivelAtual;
    }

    public void setNivelAtual(Nivel nivelAtual) {
        this.nivelAtual = nivelAtual;
    }
}