
package br.edu.ifsp.calculint.model;

import jakarta.persistence.*;

@Entity
@Table(name = "exercicio")
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_exercicio")
    private Long id;

    @Column(nullable = false, length = 500)
    private String enunciado;

    @Column(nullable = false)
    private String tipo;

    public Long getId() {
        return id;
    }

    public String getEnunciado() {
        return enunciado;
    }

    public void setEnunciado(String enunciado) {
        this.enunciado = enunciado;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
