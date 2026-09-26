package br.edu.ifsp.calculint.model;

public class Exercicio {

    private String titulo;

    private String descricao;

    private String resposta;

    public void setResposta(String resposta) {
        this.resposta = resposta;
    }

    public String getResposta() {
        return resposta;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean naoTemResposta(){
        return resposta == null || resposta.trim().length() < 1;
    }

    public boolean isValido(){
        return titulo != null && descricao != null;
    }

}
